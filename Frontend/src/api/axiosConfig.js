import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

// Interceptor to attach JWT token to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses and automatically refresh expired access tokens (JWT)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si la API retorna 401 (No autorizado) y no hemos reintentado ya esta petición
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcamos la petición para evitar bucles infinitos
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          // Solicitamos un nuevo access token usando el refresh token.
          // Usamos una instancia limpia de axios para no disparar interceptores infinitos
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/refresh/`, {
            refresh: refreshToken
          });
          
          // Django SimpleJWT retorna el nuevo access token en data.access (o data.data.access si usa el wrapper)
          const newAccessToken = response.data?.data?.access || response.data?.access;
          
          if (newAccessToken) {
            localStorage.setItem('access_token', newAccessToken);
            
            // Actualizamos la cabecera de la petición original y reintentamos
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed, redirecting to login:", refreshError);
          // Si el refresh token también falló (expirado o inválido), limpiamos localStorage y redirigimos
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No hay refresh token disponible, forzar login
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
