"use client";
import IconLogoDark from "@/shared/icons/IconLogoDark";
import TextInput from "@/shared/ui/TextInput";
import GithubButton from "@/shared/ui/GithubButton";
import PrimaryButtonSmall from "@/shared/ui/PrimaryButtonSmall";
import { useEffect, useState } from "react";

export function LoginPage() {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState("CapsLock")) {
        setIsCapsLockOn(true);
      } else {
        setIsCapsLockOn(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex flex-col items-center gap-4">
      <IconLogoDark className="w-40 mb-2" />
      <h1 className="heading-xl font-bold">Welcome to Kanban</h1>
      <p className="body-s text-center text-gray-600">
        Please log in to continue.
      </p>

      <form className="w-full flex flex-col gap-4">
        <TextInput label={"Email Address"} name={"email"} type={"text"} />
        <TextInput
          label={"Password"}
          name={"password"}
          type={"password"}
          isCapslockOn={isCapsLockOn}
        />
        <PrimaryButtonSmall type="submit">Login</PrimaryButtonSmall>
      </form>

      <div className="w-full pt-6 pb-4 flex flex-col gap-4 border-t  border-lines-light">
        <GithubButton />
      </div>
    </div>
  );
}
export default LoginPage;
