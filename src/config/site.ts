/**
 * Build-time switch for the contact-free deployment (the link shared on
 * platforms like Upwork, which forbid sharing contact info before a contract).
 * Set `VITE_HIDE_CONTACT=true` in that deployment's environment. Contact
 * fields are also stripped from profile.json at build time (see vite.config.ts),
 * so they never reach the bundle.
 */
export const HIDE_CONTACT = import.meta.env.VITE_HIDE_CONTACT === 'true'
