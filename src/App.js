import React from 'react';

import AdvisorContainer from './modules/advisor/containers/AdvisorContainer';

import logo from './static/adviqo-logo-mobile.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Adviqo Challenge
        </p>
      </header>
      <main>
        <AdvisorContainer />
      </main>
    </div>
  );
}

export default App;
