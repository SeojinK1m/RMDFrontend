import './App.css';
import Eateries from './Eateries'
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/:schoolUrl" component={Eateries}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
