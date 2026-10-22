import { detectLanguage } from './language';

describe('detectLanguage', () => {
  it('detects English by default', () => {
    expect(detectLanguage('How do I open an account?')).toBe('en');
  });

  it('detects Nigerian Pidgin', () => {
    expect(detectLanguage('Abeg, my transfer never enter')).toBe('pcm');
  });

  it('detects Yoruba markers', () => {
    expect(detectLanguage('Jowo, mo fe ranse')).toBe('yo');
  });

  it('detects Igbo markers', () => {
    expect(detectLanguage('Biko, kedu ka m ga-eme')).toBe('ig');
  });

  it('detects Hausa markers', () => {
    expect(detectLanguage('Sannu, na gode')).toBe('ha');
  });
});
