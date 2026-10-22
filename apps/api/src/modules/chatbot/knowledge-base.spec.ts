import { retrieveKnowledge } from './knowledge-base';

describe('retrieveKnowledge', () => {
  it('returns relevant entries for a transfer problem', () => {
    const results = retrieveKnowledge('my transfer was debited but not received');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.slug).toBe('transfer-pending');
  });

  it('returns nothing for unrelated queries', () => {
    expect(retrieveKnowledge('zzzz qqqq wwww')).toHaveLength(0);
  });

  it('never returns entries containing invented figures', () => {
    const all = retrieveKnowledge('savings interest rate loan', 10);
    for (const entry of all) {
      expect(entry.content).not.toMatch(/\d+%/);
      expect(entry.content).not.toMatch(/₦\s?\d/);
    }
  });
});
