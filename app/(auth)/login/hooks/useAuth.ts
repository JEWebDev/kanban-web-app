import { useState } from "react";
import { LoginCredentials, LoginSchema } from "../schemas/login";
import { login } from "../services/login";
import { createClient } from "@/lib/supabase/client";

function useAuth({ email, password }: LoginCredentials) {
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const supabaseClient = createClient();

  function validateData() {
    const result = LoginSchema.safeParse({ email, password });

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setErrors(issues);
      return null;
    }

    setErrors(undefined);
    return result?.data;
  }

  async function handleLogin() {
    const validatedData = validateData();

    if (!validatedData) return;
    const { email: parsedEmail, password: parsedPassword } = validatedData;

    const response = await login({
      email: parsedEmail,
      password: parsedPassword,
      supabaseClient,
    });

    if (response?.error) {
      setErrors(response.error);
      return false;
    } else {
      setErrors(undefined);
      return true;
    }
  }

  return { handleLogin, errors };
}
export default useAuth;
