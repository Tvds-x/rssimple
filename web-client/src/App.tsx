import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useTheme } from "./components/theme-provider";
import { Button } from "@/components/ui/button";
import { useUserStore } from "./store";
import { login } from "./services/authService";

const App = () => {
  const { theme, setTheme } = useTheme();
  const isAuth = useUserStore((state) => state.isAuth);
  const updateAuthCode = useUserStore((state) => state.updateToken);
  const updateIsAuth = useUserStore((state) => state.updateIsAuth);

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const token = await login(credentialResponse);
      console.log(token);
      updateAuthCode(token);
      updateIsAuth(true);
    } catch (error) {
      console.error("Error authenticating user", error);
    }
  };

  return (
    <>
      <p>{isAuth.toString()}</p>
      <GoogleLogin
        onSuccess={handleLogin}
        theme={theme === "dark" ? "filled_black" : "filled_blue"}
        width="200"
        shape="pill"
      />
      <Button
        onClick={() => {
          setTheme("light");
        }}
        variant="link"
      >
        Light
      </Button>
      <Button
        onClick={() => {
          setTheme("dark");
        }}
        variant="link"
      >
        Dark
      </Button>
    </>
  );
};

export default App;
