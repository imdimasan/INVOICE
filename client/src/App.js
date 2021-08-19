import AppRouter from "./routes/AppRouter";
import { Header } from "modules";
import { useAuth } from "hooks/auth.hook";
import { AuthContext } from "context/AuthContext";
import "./assets/fonts/MontserratAlternates/index.scss";
import { Loader } from "./components";
import jwt_decode from "jwt-decode";
function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  if (token) {
    const expiration = jwt_decode(token);
    const now = new Date().getTime();
    console.log(expiration.exp * 1000, now);
    if (expiration.exp * 1000 <= now) {
      console.log("EXPIRED");
      logout();
    } else {
      console.log("NOT EXPIRED");
    }
  }

  if (!ready) {
    return <Loader />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
        }}
      >
        <Header isAuthenticated={isAuthenticated} />
        <AppRouter isAuthenticated={isAuthenticated} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
