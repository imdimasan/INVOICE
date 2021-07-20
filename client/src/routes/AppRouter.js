import { Switch, Route, Redirect } from "react-router-dom";
import { pageRoutes } from "constants/pageRoutes";
import {
  Page404,
  HomePage,
  AddPage,
  ClientsPage,
  NewClientPage,
  NewLinkPage,
} from "pages";

function AppRouter({ isAuthenticated }) {
  if (isAuthenticated) {
    console.log("Logged in");
    return (
      <>
        <Switch>
          {/* <Route exact path={pageRoutes.HOME}>
            <HomePage />
          </Route> */}
          <Route exact path={pageRoutes.ADD}>
            <AddPage />
          </Route>
          <Route path={pageRoutes.CLIENTS}>
            <ClientsPage />
          </Route>
          <Route path={pageRoutes.NEWCLIENT}>
            <NewClientPage />
          </Route>
          <Route path={pageRoutes.NEWLINK}>
            <NewLinkPage />
          </Route>
          <Redirect exact from="/" to={pageRoutes.ADD} />
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </>
    );
  }
  console.log("Guest");
  return (
    <>
      <Switch>
        <Route exact path={pageRoutes.HOME}>
          <HomePage />
        </Route>
        <Redirect exact from="/" to={pageRoutes.HOME} />
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}

export default AppRouter;
