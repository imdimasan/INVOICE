import { Input, Buttons } from "components";
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
  const [registrationForm, setRegistrationForm] = useState({
    email: "",
    password: "",
    organization: "",
    unp: "",
    bank: "",
    bic: "",
  });

  // Отключаю инпуты регистрации при 201 ответе
  const [disabled, setDisabled] = useState(false);

  // Палю что внутри стейтов
  console.log(form);
  console.log(registrationForm);

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
  const changeRegistration = (event) => {
    setRegistrationForm({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email") {
      setLoginError();
    } else if (event.target.name === "password") {
      setPasswordError();
    } else {
    }
  };

  // POST запросы на бэк регистрация и логин

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        ...registrationForm,
      });
      message(data.message);
      setDisabled(true);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  // Рисование страницы
  return (
    <>
      <div className="signup__wrapper">
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

      <div className="signup__wrapper">
        <Input
          label="Email"
          type="email"
          id="emailreg"
          name="email"
          onChange={changeRegistration}
          value={registrationForm.email}
          helperText={loginError}
          disabled={disabled}
          error={loginError}
        />
        <Input
          label="Password"
          type="password"
          id="passwordreg"
          name="password"
          onChange={changeRegistration}
          value={registrationForm.password}
          error={passwordError}
          disabled={disabled}
          helperText={passwordError}
        />
        <Input
          label="Название организации"
          type="text"
          id="organization"
          name="organization"
          disabled={disabled}
          value={registrationForm.organization}
          onChange={changeRegistration}
        />
        <Input
          label="УНП"
          type="text"
          id="unp"
          name="unp"
          disabled={disabled}
          value={registrationForm.unp}
          onChange={changeRegistration}
        />
        <Input
          label="Реквизиты"
          type="text"
          id="bank"
          disabled={disabled}
          name="bank"
          value={registrationForm.bank}
          onChange={changeRegistration}
        />
        <Input
          label="БИК"
          type="text"
          id="bic"
          name="bic"
          value={registrationForm.bic}
          disabled={disabled}
          onChange={changeRegistration}
        />
      </div>
      <div className="buttons__wrapper">
        <Buttons
          variant="outlined"
          onClick={registerHandler}
          disabled={loading}
        >
          Registration
        </Buttons>
      </div>

      <div className="data__wrapper"></div>
    </>
  );
}
export default Auth;
