"use client";
import IconLogoDark from "@/shared/icons/IconLogoDark";
import TextInput from "@/shared/ui/TextInput";
import GithubButton from "@/shared/ui/GithubButton";
import PrimaryButtonSmall from "@/shared/ui/PrimaryButtonSmall";
import useCapsLock from "./services/useCapsLock";
import useAuth from "./hooks/useAuth";
import { useEffect, useRef } from "react";
import { loginWithGithub } from "./actions";
import { createClient } from "@/lib/supabase/client";
import router from "next/router";

export function LoginPage() {
  const { isCapsLockOn } = useCapsLock();
  const { handleLogin, errors, setErrors } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setErrors({ email: "", password: "" });
  };
  useEffect(() => {
    if (errors?.email) {
      emailRef.current?.focus();
    }
    if (errors?.password && passwordRef.current) {
      passwordRef.current.value = "";
    }
  }, [errors?.email, errors?.password]);

  useEffect(() => {
    const handlePageShow = async (e: PageTransitionEvent) => {
      if (e.persisted) {
        // La página fue restaurada desde bfcache
        const supabase = createClient();
        const { data } = await supabase.auth.getClaims();
        if (data?.claims) router.replace("/boards");
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);
  return (
    <div className="flex flex-col items-center gap-4">
      <IconLogoDark className="w-40 mb-2" />
      <h1 className="heading-xl font-bold">Welcome to Kanban</h1>
      <p className="body-s text-center text-gray-600">
        Please log in to continue.
      </p>

      <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
        <TextInput
          label={"Email Address"}
          name={"email"}
          error={errors?.email}
          onBlur={handleBlur}
          ref={emailRef}
        />
        <TextInput
          label={"Password"}
          name={"password"}
          isCapslockOn={isCapsLockOn}
          error={errors?.password}
          ref={passwordRef}
        />
        <PrimaryButtonSmall type="submit">Login</PrimaryButtonSmall>
      </form>

      <div className="w-full pt-6 pb-4 flex flex-col gap-4 border-t  border-lines-light">
        <GithubButton onClick={loginWithGithub} />
      </div>
    </div>
  );
}
export default LoginPage;
