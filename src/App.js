import './style/App.css'
import Eateries from './Pages/Eateries'
import Home from './Pages/Home'
import Reviews from './Pages/Reviews'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Breadcrumbs from './Components/Breadcrumbs'
import AddPage from './Pages/AddPage'
import AddRestaurant from './Pages/AddRestaurant';

function App() {

  return (
    <Router>
      <div>
        <Breadcrumbs />
        <Switch>
          <Route exact from="/" render = {props => <Home {...props}/>}/>
          <Route exact path="/add" render = {props => <AddPage {...props}/>}/>
          <Route exact path="/:schoolUrl/addeatery" render = {props => <AddRestaurant {...props}/>}/>
          <Route exact path="/:schoolUrl" render = {props => <Eateries {...props}/>}/>
          <Route exact path="/:schoolUrl/:eateryName" render = {props => <Reviews {...props}/>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;