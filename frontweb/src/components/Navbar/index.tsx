import './styles.css';
import 'bootstrap/js/src/collapse.js';
import { Link } from 'react-router-dom';
import {
  getTokenData,
  isAuthenticated,
  removeTokenData,
} from 'util/requests';
import { useContext, useEffect } from 'react';
import history from 'util/history';
import { AuthContext } from 'AuthContext';

function Navbar() {
  
  const {authContextData, setAuthContextData} = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoff = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeTokenData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        <div className="nav-login-logout">
          {authContextData.authenticated && (
            <>
              <span className="nav-username">{authContextData.tokenData?.user_name}</span>
              <a href="#logoff" onClick={handleLogoff}>
                SAIR
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
