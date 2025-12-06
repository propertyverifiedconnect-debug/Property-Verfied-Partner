import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useUnauthorize() {
  const router = useRouter();

  return () => {
    Cookies.remove("client_token_partner", { path: "/" });
    localStorage.clear();
    router.push("/auth/login");
  };
}
