import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

const mount = (element, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (typeof onNavigate === 'function') {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} onSignIn={onSignIn}/>,
    element
  );

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRootElement = document.querySelector('#__auth-root');
  if (devRootElement) {
    mount(devRootElement, { defaultHistory: createBrowserHistory(), onSignIn: () => { } });
  }
}

export { mount };
