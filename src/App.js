
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/LoginForm/index.js'
import RegisterForm from './components/RegisterForm/index.js'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm}/>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <Route path="/not-found" component={NotFound} />
        
        <Redirect to="not-found" />
      </Switch>
  </BrowserRouter>
)

export default App
