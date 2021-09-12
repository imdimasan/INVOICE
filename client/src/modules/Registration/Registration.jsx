import { Input, Buttons, Text } from "components";
import { useState } from "react";
import axios from "axios";
import "./Registration.scss";

function Registration() {
  const [loginError, setLoginError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const [registrationForm, setRegistrationForm] = useState({
    email: "",
    password: "",
    organization: "",
    phone: "",
    unp: "",
    legaladdress: "",
    bankaccount: "",
    bankname: "",
    bic: "",
    pro: false,
  });

  const changeRegistration = (event) => {
    console.log(registrationForm);
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

  const registrationHandler = async () => {
    await axios
      .post("/api/auth/register", { ...registrationForm })
      .then(function (response) {
        console.log(response);
        setNotice(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          setNotice(error.response.data.message);

          if (error.response.data.errors) {
            error.response.data.errors.forEach((el) => {
              if (el.param === "email") {
                setLoginError(el.msg);
              } else if (el.param === "password") {
                setPasswordError(el.msg);
              } else {
              }
              console.log(el);
            });
          }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div className="signup__wrapper">
      <Input
        label="Email"
        type="email"
        id="emailreg"
        name="email"
        onChange={changeRegistration}
        value={registrationForm.email}
        helperText={loginError}
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
        helperText={passwordError}
      />
      <Input
        label="Название организации"
        type="text"
        id="organization"
        name="organization"
        value={registrationForm.organization}
        onChange={changeRegistration}
      />
      <Input
        label="УНП"
        type="text"
        required="true"
        id="unp"
        name="unp"
        value={registrationForm.unp}
        onChange={changeRegistration}
      />
      <Input
        label="Юридический адрес"
        type="text"
        id="legaladdress"
        name="legaladdress"
        value={registrationForm.legaladdress}
        onChange={changeRegistration}
      />
      <Input
        label="Контактный телефон"
        type="number"
        id="phone"
        name="phone"
        value={registrationForm.phone}
        onChange={changeRegistration}
      />
      <Input
        label="Название банка"
        type="text"
        id="bankname"
        name="bankname"
        value={registrationForm.bankname}
        onChange={changeRegistration}
      />
      <Input
        label="Расчетный счет банка IBAN"
        type="text"
        id="bankaccount"
        name="bankaccount"
        value={registrationForm.bankaccount}
        onChange={changeRegistration}
      />
      <Input
        label="БИК"
        type="text"
        id="bic"
        name="bic"
        value={registrationForm.bic}
        onChange={changeRegistration}
      />
      <div className="buttons__wrapper">
        <Buttons
          variant="outlined"
          onClick={registrationHandler}
          disabled={loading}
        >
          Registration
        </Buttons>
      </div>
      <div
        className={
          notice ? "registration__notice active" : "registration__notice"
        }
      >
        <Text variant="p">{notice ? notice : ""}</Text>
        <div
          className="close__btn"
          onClick={() => {
            setNotice("");
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}

export default Registration;
