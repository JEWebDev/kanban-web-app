import { useMutation } from "@tanstack/react-query";
import { loginWithPassword } from "../actions";

function useAuth() {
  function useLogin() {
    return useMutation({
      mutationFn: loginWithPassword,
    });
  }

  return { useLogin };
}
export default useAuth;
