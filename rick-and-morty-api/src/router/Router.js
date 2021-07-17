import { Route, Switch } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import ChracterList from "../pages/ChracterList/ChracterList";
import ChracterDetail from "../pages/ChracterDetail/ChracterDetail";

function Router() {
  return (
    <Switch>
      <PublicRoute path="/" exact>
        <Home />
      </PublicRoute>
      <PublicRoute path="/chracters" exact>
        <ChracterList />
      </PublicRoute>
      <PublicRoute path="/chracterDetail/:id">
        <ChracterDetail />
      </PublicRoute>
    </Switch>
  );
}

const PublicRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={() => <Layout>{children}</Layout>} />;
};

export default Router;
