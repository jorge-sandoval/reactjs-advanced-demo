import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';
import './NavLayout.css';

const NavLayout = () => {
  const { state } = useNavigation();
  const isProcessing = state === 'loading' || state === 'submitting';

  return (
    <>
      <nav className="nav-layout">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/custom-input">Custom Input</NavLink>
          </li>
        </ul>
      </nav>

      <ScrollRestoration />
      {isProcessing && <div className="loading-spinner"></div>}
      <div className={`container ${isProcessing ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default NavLayout;
