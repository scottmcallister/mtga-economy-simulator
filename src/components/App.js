import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Simulator from './simulator';
import Charts from './charts';
import Tables from './tables';

const List = styled.ul({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
  background: '#444444'
});
const ListItem = styled.li({
  display: 'inline',
  float: 'left'
});
const Content = styled.div({
  paddingTop: '60px'
});

function App() {

  return (
    <Router>
      <div>
        <nav>
          <List>
            <ListItem>
              <Link to="/" className='navLink'>Simulator</Link>
            </ListItem>
            <ListItem>
              <Link to="/charts" className='navLink'>Charts</Link>
            </ListItem>
            <ListItem>
              <Link to="/tables" className='navLink'>Tables</Link>
            </ListItem>
          </List>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Content>
          <Switch>
            <Route path="/charts">
              <Charts />
            </Route>
            <Route path="/tables">
              <Tables />
            </Route>
            <Route path="/">
              <Simulator />
            </Route>
          </Switch>
        </Content>
      </div>
    </Router>
  )
}

export default App;
