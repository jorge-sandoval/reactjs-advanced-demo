import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';
import navElements from '../models/nav-elements';

const NavLayout = () => {
  const { state } = useNavigation();
  const isProcessing = state === 'loading' || state === 'submitting';

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-subtle">
        <ul className="nav nav-underline container-fluid justify-content-center">
          {navElements.map((element, index) => (
            <li key={index} className="nav-item">
              <NavLink
                className="nav-link link-body-emphasis"
                to={element.link}
              >
                {element.name}
              </NavLink>
            </li>
          ))}
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
