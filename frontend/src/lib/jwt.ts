type DecodedToken = {
  id: number;
  email: string;
  nombre: string;
  role: "profesional" | "empresa";
};

export const decodeToken = (token: string): DecodedToken | null => {
  const CLAIMS = {
    id: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  };

  try {
    const payload = token.split(".")[1];

     if (!payload) {
      return null;
    }
    const decoded = JSON.parse(atob(payload));

    return {
      id: Number(decoded[CLAIMS.id]),
      email: decoded[CLAIMS.email],
      nombre: decoded[CLAIMS.name],
      role: decoded[CLAIMS.role],
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};