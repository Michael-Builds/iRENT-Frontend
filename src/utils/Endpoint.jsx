export const domain = process.env.NODE_ENV === 'production' ? "http://irent-services.com" : "http://192.168.1.110:7000";

export const auth = `${domain}/auth/api`;

export const property_url = `${domain}/property/api`

export const favorites_ul = `${domain}/favorites/api`

export const viewing_url = `${domain}/viewing/api`
