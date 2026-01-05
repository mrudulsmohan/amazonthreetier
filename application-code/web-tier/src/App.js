import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import FocusLock from 'react-focus-lock';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';

import DatabaseDemo from './components/DatabaseDemo/DatabaseDemo';
import Home from './components/Home/Home';

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef(null);
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <div ref={node}>
        <FocusLock disabled={!open}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />

          <Router>
            <Menu open={open} setOpen={setOpen} id={menuId} />

            <Switch>
              <Route path="/db">
                <DatabaseDemo />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>

        </FocusLock>
      </div>
    </ThemeProvider>
  );
}

export default App;
