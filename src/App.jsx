import React from 'react';
import Basket from './basket';

class App extends React.Component {
  render () {
    return (
      <div className="app">
        <div>This is title</div>
        <Basket />
        <div>This is footer</div>
      </div>
    );
  }
}

export default App;
