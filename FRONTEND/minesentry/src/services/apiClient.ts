
/**
 * Centralized API Client for MineSentry
 *
 * Handles:
 * - Backend base URL
 * - JWT access token management
 * - Automatic Authorization headers
 * - HTTP errors
 */

export const SIMULATED_LATENCY_MS = 200;

export const delay = (
  ms: number = SIMULATED_LATENCY_MS
): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));


// Backend configuration
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");


// JWT storage (current browser tab session)
const TOKEN_KEY = "minesentry_access_token";

export const setAccessToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};


// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const headers = new Headers(options.headers);

  // Set JSON content type when a request body exists
  if (
    options.body &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Automatically attach JWT when available
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const response = await fetch(
    `${API_BASE_URL}${normalizedEndpoint}`,
    {
      ...options,
      headers,
    }
  );

  const responseText = await response.text();

  let responseData: any = null;

  if (responseText) {
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }
  }

  if (!response.ok) {

    // Clear an invalid or expired session
    if (response.status === 401) {
      clearAccessToken();
    }

    const message =
      typeof responseData?.detail === "string"
        ? responseData.detail
        : `API request failed with status ${response.status}`;

    throw new Error(message);
  }

  return responseData as T;
}


// Convenient HTTP methods
export const api = {

  get: <T>(endpoint: string): Promise<T> =>
    apiRequest<T>(endpoint),

  post: <T>(
    endpoint: string,
    body: unknown
  ): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(
    endpoint: string,
    body: unknown
  ): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "DELETE",
    }),
};
