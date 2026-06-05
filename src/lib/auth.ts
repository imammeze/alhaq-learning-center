const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api`;

// ========== TOKEN MANAGEMENT ==========

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function setToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("auth_token");
}

// ========== USER DATA ==========

export interface UserData {
  id: string;
  name: string;
  email: string;
  whatsapp_number: string | null;
  role: "orang_tua" | "siswa_mandiri";
  children?: any[];
  student?: any;
}

export function getUser(): UserData | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("auth_user");
  return data ? JSON.parse(data) : null;
}

export function setUser(user: UserData): void {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function removeUser(): void {
  localStorage.removeItem("auth_user");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// ========== AUTH ACTIONS ==========

export async function login(email: string, password: string): Promise<{ user: UserData; token: string }> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMsg = data.errors?.email?.[0] || data.message || "Login gagal.";
    throw new Error(errorMsg);
  }

  setToken(data.token);
  setUser(data.user);

  return { user: data.user, token: data.token };
}

export async function logout(): Promise<void> {
  const token = getToken();
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch {
      // Ignore errors on logout
    }
  }
  removeToken();
  removeUser();
}

// ========== AUTHENTICATED FETCH ==========

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Token expired or invalid → clean up
  if (res.status === 401) {
    removeToken();
    removeUser();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return res;
}
