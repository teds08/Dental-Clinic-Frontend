export interface JwtPayload {
  id: number;
  role_id: number;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );

    return decodedPayload as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);

  if (!payload || !payload.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}
