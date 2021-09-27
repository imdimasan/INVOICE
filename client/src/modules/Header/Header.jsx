import { NavigationLink } from "components";
import { pageRoutes } from "constants/pageRoutes";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { ReactComponent as DocSvg } from "assets/icons/document.svg";
import { ReactComponent as AddSvg } from "assets/icons/add.svg";
import { ReactComponent as ClientsSvg } from "assets/icons/clients.svg";
import "./Header.scss";

function Header({ isAuthenticated }) {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  if (isAuthenticated) {
    console.log("Menu logged in");
    return (
      <div className="wrapper header">
        <div className="header__menu">
          <menu>
            <li>
              <NavigationLink
                href={pageRoutes.CREATE}
                className={"header__menu__item"}
                title={"Create document with one click"}
              >
                <DocSvg />
                Создать документ
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                href={pageRoutes.ADD}
                className={"header__menu__item"}
                title={"Go to Add Page"}
              >
                <AddSvg />
                Добавить клиента
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                href={pageRoutes.CLIENTS}
                className={"header__menu__item"}
                title={"Go to Add Page"}
              >
                <ClientsSvg />
                Мои клиенты
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                href=""
                className={"header__menu__item"}
                onClick={logoutHandler}
              >
                Выйти
              </NavigationLink>
            </li>
          </menu>
        </div>
        {/* <div className="header__logout">
          <NavigationLink href="#" onClick={logoutHandler}>
            Выйти
          </NavigationLink>
        </div> */}
      </div>
    );
  }
  console.log("Menu Guest");
  return (
    <div className="wrapper header">
      <menu>
        <li>
          <NavigationLink
            href={pageRoutes.HOME}
            className={"header__menu__item"}
            title={"Go to Home Page"}
          >
            Home
          </NavigationLink>
        </li>
      </menu>
    </div>
  );
}

export default Header;
