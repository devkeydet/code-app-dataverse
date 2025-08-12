// Reusable validation utilities
// Add more validators here as needed.

/**
 * Basic email format validation.
 * Accepts most standard email formats while remaining lightweight.
 * Returns true for empty strings so optional email fields can skip validation upstream.
 */
export function isValidEmail(email: string | undefined | null): boolean {
    if (!email) return true; // treat empty as valid when field optional
    const trimmed = email.trim();
    if (!trimmed) return true;
    // Simple pattern: local-part@domain.tld (at least one dot in domain part)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed);
}

/**
 * Returns an error message if invalid, otherwise null.
 */
export function getEmailError(email: string | undefined | null): string | null {
    return isValidEmail(email) ? null : 'Please enter a valid email address.';
}
