import { SupabaseClient } from "@supabase/supabase-js";
import { LoginCredentials } from "../schemas/login";
import { createClient } from "@/lib/supabase/client";
interface LoginParams extends LoginCredentials {
  supabaseClient: SupabaseClient;
}
export const login = async ({
  email,
  password,
  supabaseClient,
}: LoginParams) => {
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error && error?.message?.includes("Invalid login credentials")) {
      return { error: "Invalid email or password." };
    }

    return { error };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { email: "An unknown error occurred during login." };
    }
  }
};

export const loginWithGithub = async () => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
};

export const logout = async (supabaseClient: SupabaseClient) => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { error: null };
};
