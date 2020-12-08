import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


const App = () => {

  useEffect(() => {
    axios
    .get(`http://localhost:3002/product`)
    .then((res) => console.log(res));
    }, []);




return (
  <div>

  </div>
)

}

export default App;
