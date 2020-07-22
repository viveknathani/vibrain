import React from 'react';
import Header from './components/header/header';
import GraphsList from './components/graph/graph';
import Footer from './components/footer/footer';

class App extends React.Component
{
  render()
  {
    return(
      <div>
        <Header/>
        <GraphsList/>
        <Footer/>
      </div>
    )
  }
}; 

export default App;
