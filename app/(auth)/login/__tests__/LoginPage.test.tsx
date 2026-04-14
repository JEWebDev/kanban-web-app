import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "../page";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockLoginWithPassword, mockLoginWithGithub, mockReplace } = vi.hoisted(
  () => ({
    mockLoginWithPassword: vi.fn(),
    mockLoginWithGithub: vi.fn(),
    mockReplace: vi.fn(),
  }),
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock("../actions", () => ({
  loginWithPassword: (...args: unknown[]) => mockLoginWithPassword(...args),
  loginWithGithub: (...args: unknown[]) => mockLoginWithGithub(...args),
}));

function renderLoginPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("LoginPage", () => {
  it("renders the login form", () => {
    renderLoginPage();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^login$/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields on submit", async () => {
    renderLoginPage();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /^login$/i }));

    const errors = await screen.findAllByText("Can't be empty");
    expect(errors).toHaveLength(2);
  });

  it("calls loginWithPassword on valid submit", async () => {
    mockLoginWithPassword.mockResolvedValue(null);
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/email address/i),
      "user@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    await waitFor(() => {
      expect(mockLoginWithPassword).toHaveBeenCalledWith(
        { email: "user@example.com", password: "password123" },
        expect.anything(),
      );
    });
  });

  it("redirects to /boards on successful login", async () => {
    mockLoginWithPassword.mockResolvedValue({}); // Simulate success
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email address/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/boards");
    });
  });
});
