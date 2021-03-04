import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import NavBar from './views/NavBar/NavBar';
import Auth from '../hoc/auth';

function App() {
  return (
    <Router>
      <NavBar/>
      <div style = {{paddingTop : '70px', minHeight : 'calc(100vh - 80px'}}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
        
        </Switch>
      </div>
    </Router>

  );
}

export default App;
