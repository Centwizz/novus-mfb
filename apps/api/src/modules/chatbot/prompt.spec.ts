import { buildSystemPrompt } from './prompt';

describe('buildSystemPrompt', () => {
  it('asks the model for plain text instead of Markdown', () => {
    const prompt = buildSystemPrompt({ language: 'en', knowledge: [] });
    expect(prompt).toContain('Reply in plain text');
    expect(prompt).toContain('no **, *, #');
  });

  it('marks retrieved knowledge as untrusted', () => {
    const prompt = buildSystemPrompt({ language: 'en', knowledge: [] });
    expect(prompt).toContain('UNTRUSTED DATA');
  });

  it('tells the model not to re-ask for confirmation after escalation', () => {
    const prompt = buildSystemPrompt({ language: 'en', knowledge: [], escalated: true });
    expect(prompt).toContain('ALREADY flagged');
    expect(prompt).toContain('Do not ask whether to escalate');
  });
});
