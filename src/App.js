import { Col, Container, Row } from "react-bootstrap";
import { 
  BrowserRouter as Router, 
  Route,
  Switch 
} from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/User/Login";
import NavigationBar from "./components/NavigationBar";
import Project from "./components/Project/Project";
import ProjectList from "./components/Project/ProjectList";
import Register from "./components/Register";
import UserList from "./components/User/UserList";

function App() { 
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/add" exact component={Project} />
              <Route path="/edit/:id" exact component={Project} />
              <Route path="/list" exact component={ProjectList} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/users" exact component={UserList } />
              <Route path="/logout" exact component={Login } />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
