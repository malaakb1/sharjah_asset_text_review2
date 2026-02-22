/**
 * Shared TypeScript types / interfaces.
 * Add domain-specific types in separate files (e.g. types/evaluation.ts).
 */

export interface ApiError {
  detail: string;
}

export interface HealthResponse {
  status: string;
}
