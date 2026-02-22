/**
 * Centralized API client.
 * Uses a relative base so requests go through the Next.js rewrite proxy
 * (/api/:path* → NEXT_PUBLIC_BACKEND_ORIGIN/api/:path*).
 * This means no origin ever appears in the client bundle.
 */

const API_BASE = "";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
