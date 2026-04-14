import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginWithPassword, loginWithGithub } from "../actions";

const { mockSignInWithPassword, mockSignInWithOAuth, mockRedirect } =
  vi.hoisted(() => ({
    mockSignInWithPassword: vi.fn(),
    mockSignInWithOAuth: vi.fn(),
    mockRedirect: vi.fn(),
  }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signInWithOAuth: mockSignInWithOAuth,
    },
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("loginWithPassword", () => {
  it('returns "Can\'t be empty" error for an empty email', async () => {
    const result = await loginWithPassword({
      email: "",
      password: "password123",
    });
    expect(result?.email).toBe("Can't be empty");
  });

  it('returns "Invalid email address" error for an invalid email format', async () => {
    const result = await loginWithPassword({
      email: "notanemail",
      password: "password123",
    });
    expect(result?.email).toBe("Invalid email address");
  });

  it('returns "Can\'t be empty" error for an empty password', async () => {
    const result = await loginWithPassword({
      email: "user@example.com",
      password: "",
    });
    expect(result?.password).toBe("Can't be empty");
  });

  it("calls supabase signInWithPassword with validated credentials and returns undefined on success", async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });
    const result = await loginWithPassword({
      email: "user@example.com",
      password: "password123",
    });
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
    });
    expect(result).toBeUndefined();
  });

  it('returns "invalid email or password" for both fields when Supabase returns "Invalid login credentials"', async () => {
    mockSignInWithPassword.mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });
    const result = await loginWithPassword({
      email: "user@example.com",
      password: "wrongpassword",
    });
    expect(result).toEqual({
      email: "invalid email or password",
      password: "invalid email or password",
    });
  });

  it("returns the error message for both email and empty password when an unexpected Error is thrown", async () => {
    mockSignInWithPassword.mockRejectedValue(new Error("Network error"));
    const result = await loginWithPassword({
      email: "user@example.com",
      password: "password123",
    });
    expect(result).toEqual({ email: "Network error", password: "" });
  });
});

describe("loginWithGithub", () => {
  it("calls redirect with the OAuth URL on success", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: "https://github.com/login/oauth/authorize?client_id=abc" },
      error: null,
    });
    await loginWithGithub();
    expect(mockRedirect).toHaveBeenCalledWith(
      "https://github.com/login/oauth/authorize?client_id=abc",
    );
  });

  it("calls redirect to the error page when OAuth returns an error", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: null },
      error: { message: "OAuth error" },
    });
    await loginWithGithub();
    expect(mockRedirect).toHaveBeenCalledWith("/auth/auth-code-error");
  });
});
