import axios from 'axios';
import { auth, domain } from './Endpoint';
import { logoutUser } from './auth';

const api = axios.create({
    baseURL: domain,
    withCredentials: true,
});

// Attach token to each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 (Unauthorized) errors, refresh token, and retry the request
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    logoutUser(); // Trigger logout if no refresh token
                    return Promise.reject(error);
                }

                // Make a request to refresh the access token
                const refreshResponse = await axios.post(`${auth}/refresh-token`, {
                    refresh_token: refreshToken,
                });

                // Get new access token
                const { accessToken } = refreshResponse.data;
                localStorage.setItem('accessToken', accessToken);

                // Retry the failed request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);  // Retry original request
            } catch (refreshError) {
                logoutUser();  // Logout if refresh fails
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;
