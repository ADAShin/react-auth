import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Router from './Router';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Router />
    </BrowserRouter>
  );
};

export default App;
