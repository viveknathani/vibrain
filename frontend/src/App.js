import React from 'react';
import Header from './components/header/header';
import GraphsList from './components/graph/graph';

class App extends React.Component
{
  render()
  {
    return(
      <div>
        <Header/>
        <GraphsList/>
      </div>
    )
  }
}; 

export default App;
