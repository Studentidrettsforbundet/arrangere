import { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "./firebase";
import { currentUserState, loadingUserState } from "./stateManagement/userAuth";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { studentidrettTheme } from "./style/appTheme";
import Routes from "./components/main/Routes";

function App() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useRecoilState(loadingUserState);

  useEffect(() => {
    return auth.onAuthStateChanged((user: any) => {
      if (user !== null) {
        setCurrentUser(user.toJSON());
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={studentidrettTheme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {loading ? (
          <p></p>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Routes></Routes>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </ThemeProvider>
  );
}
export default App;
