import { SupabaseClient } from "@supabase/supabase-js";
import { LoginCredentials } from "../schemas/login";
interface LoginParams extends LoginCredentials {
  supabaseClient: SupabaseClient;
}
export const login = async ({
  email,
  password,
  supabaseClient,
}: LoginParams) => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred during login." };
    }
  }
};
