import './App.css';
import Eateries from './Eateries'
import Home from './Home'
import Reviews from './Reviews'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import AddPage from './AddPage'

function App() {

  return (
    <Router>
      <div>
        <Breadcrumbs />
        <Switch>
          <Route exact from="/" render = {props => <Home {...props}/>}/>
          <Route exact path="/add" render = {props => <AddPage {...props}/>}/>
          <Route exact path="/:schoolUrl" render = {props => <Eateries {...props}/>}/>
          <Route exact path="/:schoolUrl/:eateryUrl" render = {props => <Reviews {...props}/>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
