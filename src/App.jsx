import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Homepage } from "./pages/hompage.component";
import { MyPostsPage } from "./pages/mypostspage.component";
import { useAuth } from "./contexts/AuthContext";
import { AllPostsPage } from "./pages/allpostspage.component";

export const App = () => {
  const { currentUser, isMod } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/allposts">
          {currentUser && isMod ? <AllPostsPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/myposts">
          {currentUser ? <MyPostsPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
};
