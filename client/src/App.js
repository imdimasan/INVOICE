import AppRouter from "./routes/AppRouter";
import { Header } from "modules";
import { useAuth } from "hooks/auth.hook";
import { AuthContext } from "context/AuthContext";
import "./assets/fonts/MontserratAlternates/index.scss";
import { Loader } from "./components";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
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
