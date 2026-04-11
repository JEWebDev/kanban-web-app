import { useState } from "react";
import z from "zod";
import { LoginSchema } from "../schemas/login";
import { loginWithPassword } from "../actions";

function useAuth() {
  const [errors, setErrors] = useState<Record<string, string> | undefined>();

  function validateForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    //validate schema
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      const formErrors = {
        email: tree?.properties?.email?.errors?.[0] ?? "",
        password: tree?.properties?.password?.errors?.[0] ?? "",
      };
      setErrors(formErrors);
      return null;
    }
    return { email: result.data.email, password: result.data.password };
  }

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    const formData = validateForm(e);
    if (!formData) return;
    const { email, password } = formData;

    try {
      const { error } = await loginWithPassword({
        email,
        password,
      });
      if (error) {
        setErrors({ email: error?.toString(), password: error?.toString() });
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ email: error.message, password: error.message });
      } else {
        setErrors({
          email: "An unknown error occurred during login.",
          password: "An unknown error occurred during login.",
        });
      }
    }
  }

  return { errors, setErrors, handleLogin };
}
export default useAuth;
