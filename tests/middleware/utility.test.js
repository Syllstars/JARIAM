const { isNonEmptyString, isValidEmail, generateUniqueId, formatError, sanitizeInput, isAdult, delay } = require('../middleware/utility');

describe('Utility Functions', () => {

    test('should return true for non-empty string', () => {
        expect(isNonEmptyString('Hello')).toBe(true);
        expect(isNonEmptyString('  ')).toBe(false);
        expect(isNonEmptyString('')).toBe(false);
    });

    test('should validate email correctly', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('invalid-email')).toBe(false);
    });

    test('should generate unique ID', () => {
        const id = generateUniqueId();
        expect(id).toMatch(/[a-f0-9]{32}/); // Vérifier le format hexadécimal
    });

    test('should format error correctly', () => {
        const error = formatError('Test error', 400);
        expect(error).toEqual(expect.objectContaining({
            statusCode: 400,
            message: 'Test error',
            timestamp: expect.any(String),
        }));
    });

    test('should sanitize input', () => {
        const dirtyInput = '<script>alert("XSS")</script><b>Valid</b>';
        const cleanInput = sanitizeInput(dirtyInput);
        expect(cleanInput).toBe('<b>Valid</b>');
    });

    test('should check if user is adult', () => {
        expect(isAdult('2000-01-01')).toBe(true);
        expect(isAdult('2010-01-01')).toBe(false);
    });

    test('should delay correctly', async () => {
        const start = Date.now();
        await delay(1000);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
    });

});
