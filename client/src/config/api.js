const rawApiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  const normalizedPath = String(path).replace(/^\/+/, "");
  return normalizedPath ? `${API_BASE_URL}/${normalizedPath}` : API_BASE_URL;
};

export const assetUrl = (path = "") => apiUrl(path);
