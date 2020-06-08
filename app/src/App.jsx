import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from './components/pages/homePage';
import AddTasksPage from './components/pages/addTaskPage';
import TasksPage from './components/pages/tasksPage';
import NavBar from './components/navBar';

const Container = styled.div`
  width: 76%;
  height: calc(100vh - 4.8em);
  margin: 0 auto;
  background-color: white;
  padding: 2em;
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;

  h1 {
    font-size: 6em;
  }
`;

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Container>
      <Switch>
        <Route path="/users" exact component={AddTasksPage} />
        <Route path="/tasks" exact component={TasksPage} />
        <Route path="/tasks/:id" component={TasksPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/">
          <NotFound>
            <h1>404</h1>
          </NotFound>
        </Route>
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
