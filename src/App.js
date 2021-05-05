import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/0.layout';

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Switch>
          <Route path="*" name="Welcome!" render={(props) => <Layout {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App;
