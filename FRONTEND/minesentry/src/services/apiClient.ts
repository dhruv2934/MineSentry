/**
 * Simulated API Client for Future Backend Integration
 * 
 * When backend endpoints are deployed, this client will configure
 * Axios / Fetch with base URL, JWT authorization headers, and response interceptors.
 * Currently, it provides a realistic asynchronous delay helper.
 */

export const SIMULATED_LATENCY_MS = 200;

export const delay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Example future configuration:
// export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
