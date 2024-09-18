export const domain = process.env.NODE_ENV === 'production' ? "https://irent-backend.onrender.com" : "http://localhost:7000";

export const auth = `${domain}/auth/api`;

export const property_url = `${domain}/property/api`

export const favorites_url = `${domain}/favorites/api`

export const viewing_url = `${domain}/viewing/api`