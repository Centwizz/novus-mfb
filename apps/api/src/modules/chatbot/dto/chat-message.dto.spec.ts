import { validate } from 'class-validator';
import { ChatMessageDto } from './chat-message.dto';

async function errorsFor(conversationId: string) {
  const dto = new ChatMessageDto();
  dto.message = 'hello';
  dto.conversationId = conversationId;
  return (await validate(dto)).filter((error) => error.property === 'conversationId');
}

describe('ChatMessageDto conversationId', () => {
  it('accepts a database UUID', async () => {
    await expect(errorsFor('11111111-1111-4111-8111-111111111111')).resolves.toHaveLength(0);
  });

  it('accepts an in-memory id issued during an outage', async () => {
    await expect(errorsFor('mem-mvutgilh-1')).resolves.toHaveLength(0);
  });

  it('rejects arbitrary strings', async () => {
    await expect(errorsFor('not-a-conversation-id')).resolves.toHaveLength(1);
  });
});
