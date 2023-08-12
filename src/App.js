import React from "react";
import './App.css'
import { actions, drama, originals, sitcoms } from "./urls";
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";


function App() {

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost title='Netflix Orignals' url={originals} />
      <RowPost title='Action' isSmall url={actions} />
      <RowPost title='Drama' isSmall url={drama} />
      <RowPost title='Sitcom' isSmall url={sitcoms} />
    </div>
  );

}

export default App;
