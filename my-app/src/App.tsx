import * as React from 'react';
import './App.css';
import Header from "./components/Header";

class App extends React.Component {

  
  public render() {
    return (
      <div>
        <div className="app-title">
          <header>
            <div className="Title-header"
                 id="Title-header">
              <h1>Currency Conversion Form</h1>
              <p>Providing you currency exchange info!</p>
            </div>
          </header>
          <div className="app-bar">
            <Header />
          </div>
          
        </div>
      </div>

    );
  }
}

export default App;
