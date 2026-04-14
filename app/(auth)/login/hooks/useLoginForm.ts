import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";
import { LoginCredentials, LoginSchema } from "../schemas/login";
import useCapsLock from "../services/useCapsLock";

export const useLoginForm = () => {
  const router = useRouter();
  const { useLogin } = useAuth();
  const { isCapsLockOn } = useCapsLock();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  const { mutate: loginMutate, isPending } = useLogin();

  const emailProps = register("email");

  const {
    onBlur: passwordOnBlur,
    ref: passwordRef,
    ...passwordRest
  } = register("password");

  const passwordProps = {
    ...passwordRest,
    ref: passwordRef,
    onBlur: passwordOnBlur,
  };

  const onSubmit = handleSubmit((data) => {
    loginMutate(data, {
      onSuccess: (result) => {
        if (result?.email) {
          setError("email", { message: result.email });
          setError("password", { message: result.password ?? "" });
          setValue("password", "");
          setFocus("email");
        } else {
          router.replace("/boards");
        }
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          setError("email", {
            message: error.message ?? "Something went wrong during login.",
          });
        }
      },
    });
  });

  return {
    emailProps,
    passwordProps,
    onSubmit,
    errors,
    isPending,
    isCapsLockOn,
  };
};
