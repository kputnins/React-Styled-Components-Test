import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';

import { COLORS } from '../constants/constants';

const NAV = styled.nav`
  background-color: ${COLORS.COLOR_DARK};
  padding: 0 1.25em;
`;

const UL = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;

  a {
    color: ${COLORS.COLOR_FONT};
    text-decoration: none;
    font-size: 1.7em;

    &.active {
      background: ${lighten(0.05, COLORS.COLOR_DARK)};

      &:hover {
        background: ${lighten(0.1, COLORS.COLOR_DARK)};
      }
    }

    &:hover {
      background: ${lighten(0.05, COLORS.COLOR_DARK)};
    }
  }
`;

const LI = styled.li`
  list-style-type: none;
  min-width: 4em;
  padding: 0.8em;
  display: flex;
  justify-content: center;
`;

const NavBar = () => (
  <NAV>
    <UL>
      <NavLink to="/home">
        <LI>Home</LI>
      </NavLink>
      <NavLink to="/tasks">
        <LI>Tasks</LI>
      </NavLink>
      <NavLink to="/users">
        <LI>Add Task List</LI>
      </NavLink>
    </UL>
  </NAV>
);

export default NavBar;
