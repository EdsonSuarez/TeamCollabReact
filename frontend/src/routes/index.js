import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from '../components/home/Header';
import Login from '../components/home/Login';
import Project from '../components/Project';

export default function Routes() {
    return(
        <Router>
            <Switch>
                {/* <Header /> */}
                <Route exact path="/login" component={Login} />
                <Router>
                    <Route exact path="/project" component={Project} />
                </Router>
            </Switch>
        </Router>
    );
};