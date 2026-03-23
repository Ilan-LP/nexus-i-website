const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const API_PREFIX = "/api/v1";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : null;

  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new ApiError(message, response.status);
  }

  // Guard against reverse-proxy fallbacks returning HTML with HTTP 200.
  if (!isJson) {
    throw new ApiError("Unexpected API response format.", response.status);
  }

  if (data?.success === false) {
    throw new ApiError(data?.message || "Request failed", response.status);
  }

  return data;
}

export function postContact(payload) {
  return request(`${API_PREFIX}/contact`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function postMeeting(payload) {
  return request(`${API_PREFIX}/meeting`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getHealth() {
  return request(`${API_PREFIX}/health`, { method: "GET" });
}
