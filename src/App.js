import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateRecipe from './components/CreateRecipe';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path='/home/:id' component={RecipeDetail} />
        <Route exact path="/create" component={CreateRecipe} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default App