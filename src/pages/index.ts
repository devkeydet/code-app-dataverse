// Barrel file intentionally only exports pages we want eagerly bundled.
// Other pages (Contacts, Accounts, Settings, Starter) are lazy-loaded via dynamic import in App.tsx.
export { default as HomePage } from './HomePage'
