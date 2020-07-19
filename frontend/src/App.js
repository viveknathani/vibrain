import React from 'react';
import Header from './components/header/header';
import GraphList from './components/graph/list';

class App extends React.Component
{
  render()
  {
    return(
      <div>
        <Header/>
        <GraphList/>
      </div>
    )
  }
}; 

export default App;
