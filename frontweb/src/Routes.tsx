import Navbar from 'components/Navbar';
import { Redirect, Route, Router, Switch  } from 'react-router-dom';
import MovieDetails from 'pages/MovieDetails';
import Auth from 'pages/Admin/Auth';
import history from 'util/history';
import MovieList from 'pages/MovieList';

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Redirect from="/" to="/admin/auth/login" exact/>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/movielist" exact>
          <MovieList />
        </Route>
        <Route path="/movielist/:movieId">
          <MovieDetails />
        </Route>
        <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
        <Route path="/admin/auth">
          <Auth/>
        </Route>
        <Route path="/movieDetails/:movieId">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
