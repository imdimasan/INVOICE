import { Input, Buttons } from "components";
import { Registration } from "modules";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import { useMessage } from "hooks/message.hook";
import { useState, useEffect, useContext } from "react";

import "./Auth.scss";

// Используем контект авторизации
function Auth() {
  const auth = useContext(AuthContext);

  // Собираю данные из инпутов для логина и регистрации
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [registration, setRegistration] = useState(false);

  // Отключаю инпуты регистрации при 201 ответе
  const [disabled, setDisabled] = useState(false);

  // Всякие штуки которые идут из бэка
  const {
    loading,
    error,
    request,
    clearError,
    loginError,
    setLoginError,
    passwordError,
    setPasswordError,
  } = useHttp();
  const message = useMessage();
  if (error) {
    console.log("IF ERROR", error);
  }

  // Ошибки идут в консоль, хз как вывести на фронт
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // Сбор данных из инпутов и запихивание в стейты
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (event.target.name === "email") {
      setLoginError();
    } else {
      setPasswordError();
    }
  };

  // POST запросы на бэк регистрация и логин

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  // Рисование страницы
  return (
    <>
      <div className="signin__wrapper">
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={changeHandler}
          value={form.email}
          helperText={loginError}
          error={loginError}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={changeHandler}
          value={form.password}
          error={passwordError}
          helperText={passwordError}
        />
      </div>
      <div className="buttons__wrapper">
        <Buttons disabled={loading} onClick={loginHandler}>
          Login
        </Buttons>
      </div>
      <p
        className="regbtn"
        onClick={() => {
          setRegistration(true);
        }}
      >
        Not registered yet?
      </p>
      {registration ? <Registration /> : null}
    </>
  );
}
export default Auth;
