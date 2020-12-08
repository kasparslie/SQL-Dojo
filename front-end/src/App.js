import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { Card, Button } from 'react-bootstrap'

const App = () => {

const [data, setData] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:3002/product`)
      .then((res) => setData(res.data));
  };


return (
  <div>
    {data.map((e) => {
      return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1573376670774-4427757f7963?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Ym94fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"/>
        <Card.Body>
          <Card.Title>{e.name}</Card.Title>
          <Card.Text>
            {e.category}
          </Card.Text>
          <Card.Text>
            {e.price}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      )
    })}

  </div>
)

}

export default App;
