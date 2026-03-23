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
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new ApiError(message, response.status);
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
