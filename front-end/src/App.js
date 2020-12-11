import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Header from './header'

import { Card, Button } from 'react-bootstrap'

const App = () => {

const [data, setData] = useState([])
const [update, setUpdate] = useState("")
const [cat, setCat] = useState("")
const [search, setSearch]=useState("")
const [prod, setProd] = useState({
  name: "",
  category: "",
  price: "",
});

  useEffect(() => {
    fetchData(data);
  }, [data]);
console.log(search)

  const fetchData = () => {
    axios
      .get(`http://localhost:3002/products/${search}`)
      .then((res) => setData(res.data));
  };
const searchF = (bValue) => {
  console.log(bValue) 
  setSearch(`category/search?category=${bValue}`)
  }

  function deleteData(s, idproduct) {
    console.log(idproduct)
    s.preventDefault();
    axios
      .delete(`http://localhost:3002/products/${idproduct}`)
      .catch((err) => console.log(err))
      .then(fetchData)
  };

  const postData = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3002/products/add`,prod)
      .catch((err) => console.log(err))

      .then(setUpdate(prod.name, prod.category, prod.price));
  };

  function refreshPage(){ 
    window.location.reload(); 
}


return (
  <div>
    <Header />
    <div style={{width : '230px', height : '250px'}}>
        <form onSubmit={postData}>
            <label for="name">Product name</label>
            <input type="text" id="name" value={prod.name}
          onChange={(e) => setProd({ ...prod, name: e.target.value })}></input>
            <label for="Category">Product category</label>
            <input type="text" id="category" value={prod.category}
          onChange={(e) => setProd({ ...prod, category: e.target.value })}></input>
            <label for="Price">Product praice</label>
            <input type="number" id="price" value={prod.price}
          onChange={(e) => setProd({ ...prod, price: e.target.value })}></input>
            <button type="submit">add product</button>
        </form>
        </div>
        <div>
        <label for="category">Choose category</label>

<select name="category" id="category" multiple>
  {data.map((el)=> {
  return (
<option  onClick={(element) => {searchF(el.category)} } value={`${el.category}`}>{el.category}</option>
  )})}
 
  
</select>
<button type="button" onClick={ refreshPage }> <span>Reload</span> </button> 
        </div>
    <div>
    {data.map((ele) => {
      return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1573376670774-4427757f7963?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Ym94fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"/>
        <Card.Body>
          {ele.idproduct}
          <Card.Title>{ele.name}</Card.Title>
          <Card.Text>
            {ele.category}
          </Card.Text>
          <Card.Text>
            {ele.price}
          </Card.Text>
          <Button type="submit"
              onClick={(e) => {
                deleteData(e, ele.idproduct);
              }} variant="primary">Delete</Button>
        </Card.Body>
      </Card>
      )
    })}
    </div>

  </div>
)

}

export default App;
