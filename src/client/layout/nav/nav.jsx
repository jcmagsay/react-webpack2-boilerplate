import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import routes from 'routes/routes';

export default class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul className="nav">
        {routes.map((route, i) => {
          return (
            <li
              key={`navlink-${i}`}
            >
              <NavLink
                exact
                className="navLink"
                activeClassName="navLink_active"
                to={route.path}
              >
                {route.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    );
  }
}
