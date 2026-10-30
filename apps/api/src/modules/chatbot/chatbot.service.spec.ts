import type { LlmAdapter } from './llm/llm-adapter.interface';
import type { PrismaService } from '../../prisma/prisma.service';
import { ChatbotService } from './chatbot.service';

function connectionError() {
  return Object.assign(new Error("Can't reach database server at localhost:5432"), {
    code: 'P1001',
  });
}

describe('ChatbotService database recovery', () => {
  const llm = {
    provider: 'test',
    isConfigured: false,
    complete: jest.fn(),
  } as unknown as LlmAdapter;

  let prisma: {
    conversation: { create: jest.Mock; update: jest.Mock };
    conversationMessage: { create: jest.Mock; findMany: jest.Mock };
    ticket: { create: jest.Mock };
  };

  const build = () => new ChatbotService(llm, prisma as unknown as PrismaService);

  beforeEach(() => {
    jest.useFakeTimers();
    prisma = {
      conversation: { create: jest.fn(), update: jest.fn() },
      conversationMessage: { create: jest.fn(), findMany: jest.fn() },
      ticket: { create: jest.fn() },
    };
    prisma.conversationMessage.create.mockResolvedValue({});
    prisma.conversationMessage.findMany.mockResolvedValue([]);
    prisma.conversation.update.mockResolvedValue({});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('falls back to memory and retries after the cooldown', async () => {
    prisma.conversation.create.mockRejectedValueOnce(connectionError());
    prisma.conversation.create.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
    });

    const service = build();

    const first = await service.handleMessage({ message: 'hello' });
    expect(first.conversationId).toMatch(/^mem-/);
    expect(first.demoMode).toBe(true);
    expect(prisma.conversation.create).toHaveBeenCalledTimes(1);

    // Still inside the cooldown: no further database attempts.
    const second = await service.handleMessage({ message: 'hello again' });
    expect(second.conversationId).toMatch(/^mem-/);
    expect(prisma.conversation.create).toHaveBeenCalledTimes(1);

    // After the cooldown the service tries the database again.
    jest.advanceTimersByTime(30_001);
    const third = await service.handleMessage({ message: 'hello after recovery' });
    expect(third.conversationId).toBe('11111111-1111-4111-8111-111111111111');
    expect(prisma.conversation.create).toHaveBeenCalledTimes(2);
  });

  it('keeps an outage conversation in memory after the database returns', async () => {
    prisma.conversation.create.mockRejectedValueOnce(connectionError());
    const service = build();

    const first = await service.handleMessage({ message: 'hello' });
    expect(first.conversationId).toMatch(/^mem-/);

    prisma.conversation.create.mockResolvedValue({ id: 'uuid-1' });
    jest.advanceTimersByTime(30_001);
    prisma.conversationMessage.create.mockClear();

    const second = await service.handleMessage({
      conversationId: first.conversationId,
      message: 'my transfer is pending',
    });

    expect(second.conversationId).toBe(first.conversationId);
    expect(prisma.conversationMessage.create).not.toHaveBeenCalled();
  });

  it('confirms an escalation instead of asking for confirmation', async () => {
    prisma.conversation.create.mockResolvedValue({ id: 'uuid-escalation' });
    const service = build();

    const reply = await service.handleMessage({
      message: 'I want to speak to a human agent',
    });

    expect(reply.escalated).toBe(true);
    expect(reply.reply.toLowerCase()).not.toContain('would you like me to escalate');
  });

  it('bounds the in-memory transcript cache', async () => {
    prisma.conversation.create.mockRejectedValue(connectionError());
    const service = build();
    const cache = (
      service as unknown as { memoryTranscripts: Map<string, unknown> }
    ).memoryTranscripts;

    for (let i = 0; i < 505; i += 1) {
      await service.handleMessage({ message: 'hello' });
    }

    expect(cache.size).toBeLessThanOrEqual(500);
  });

  it('replaces a stale mem id with a fresh conversation', async () => {
    prisma.conversation.create.mockResolvedValue({
      id: '22222222-2222-4222-8222-222222222222',
    });
    const service = build();

    const reply = await service.handleMessage({
      conversationId: 'mem-stale-99',
      message: 'hello',
    });

    expect(reply.conversationId).toBe('22222222-2222-4222-8222-222222222222');
    expect(prisma.conversation.create).toHaveBeenCalledTimes(1);
  });
});
