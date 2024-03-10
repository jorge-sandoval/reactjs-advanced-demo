import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';

const NavLayout = () => {
  const { state } = useNavigation();
  const isProcessing = state === 'loading' || state === 'submitting';

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-subtle">
        <ul className="nav nav-underline container-fluid justify-content-center">
          <NavLink className="nav-item nav-link link-body-emphasis" to="/">
            Home
          </NavLink>
          <li className="nav-item">
            <NavLink className="nav-link link-body-emphasis" to="/custom-input">
              Custom Input
            </NavLink>
          </li>
        </ul>
      </nav>

      <ScrollRestoration />
      {isProcessing && <div className="loading-spinner"></div>}
      <div className={`container mt-3 ${isProcessing ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default NavLayout;
