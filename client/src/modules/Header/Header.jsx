import { NavigationLink } from "components";
import { pageRoutes } from "constants/pageRoutes";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
                Create Doc
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                href={pageRoutes.ADD}
                className={"header__menu__item"}
                title={"Go to Add Page"}
              >
                Add client
              </NavigationLink>
            </li>
            <li>
              <NavigationLink
                href={pageRoutes.CLIENTS}
                className={"header__menu__item"}
                title={"Go to Add Page"}
              >
                My clients
              </NavigationLink>
            </li>
            <li>
            <NavigationLink href="" className={"header__menu__item header__menu__logout"} onClick={logoutHandler}>
            <ExitToAppIcon fontSize={"large"}/>
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
