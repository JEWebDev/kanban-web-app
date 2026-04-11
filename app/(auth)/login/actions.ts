"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginCredentials, LoginSchema } from "./schemas/login";
import z from "zod/v4";

export async function loginWithPassword({ email, password }: LoginCredentials) {
  const supabaseClient = await createClient();

  try {
    //validate data with zod schema
    const validatedData = LoginSchema.safeParse({ email, password });

    if (!validatedData.success) {
      const tree = z.treeifyError(validatedData.error);
      return {
        error: tree?.properties?.email?.errors?.[0] || "Invalid input data.",
      };
    }

    const { error } = await supabaseClient.auth.signInWithPassword(
      validatedData.data,
    );
    if (error && error?.message?.includes("Invalid login credentials")) {
      return {
        error: "Invalid email or password.",
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error?.message);
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred during login." };
    }
  }
  redirect("/boards");
}

// OAuth login with Github function
export async function loginWithGithub() {
  const supabaseClient = await createClient();
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
  if (error) {
    console.error("Error during GitHub login:", error);
    // Optionally, you can redirect to an error page or show a message to the user
    redirect("/auth/auth-code-error");
  }

  if (data?.url) {
    redirect(data.url);
  }
}

//Logout function
export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error during logout:", error);
    return { error };
  }

  redirect("/login");
}
