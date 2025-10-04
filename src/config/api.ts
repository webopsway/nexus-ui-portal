/**
 * API Configuration
 * These values are public and exposed to the client-side bundle
 */
export const API_CONFIG = {
  baseUrl: 'https://api.example.com',
  defaultOrgId: '11111111-1111-1111-1111-111111111111',
  defaultTeamId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
} as const;

/**
 * API Headers helper
 */
export const getApiHeaders = (orgId?: string, teamId?: string) => ({
  'Content-Type': 'application/json',
  'x-org-id': orgId || API_CONFIG.defaultOrgId,
  'x-team-id': teamId || API_CONFIG.defaultTeamId,
});

/**
 * API Fetcher helper
 */
export const apiFetch = async (
  endpoint: string,
  options?: RequestInit,
  orgId?: string,
  teamId?: string
) => {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const headers = getApiHeaders(orgId, teamId);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
