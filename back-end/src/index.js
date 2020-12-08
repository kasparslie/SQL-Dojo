
const express = require("express");
const cors = require('cors');
const connection = require("./config")
const port = 3002;
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser())

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


app.get("/product/:id", (req, res) => {
  idPrd=req.params.id;
  connection.query(
    "SELECT * from product where idproduct=?", [idPrd], 
    (err, results) => {
      if (err) {  
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/product", (req, res) => {
  connection.query(
    "SELECT * from product", 
    (err, results) => {
      if (err) {  
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});


app.get("/product/:id", (req, res) => {
  const idP= req.params.id
  connection.query(
    "SELECT * from product where id=?", [idP], 
    (err, results) => {
      if (err) {  
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.put("/product/:id", (req, res) => {
  const idProd= req.params.id;
  const newProd = req.body;
  connection.query(
    "UPDATE product SET ? WHERE idproduct = ?",
    [newProd, idProd],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a product");
      } else {
        res.status(200).send("Product updated successfully 🎉");
      }
    }
  );
});

app.delete("/product/:id", (req, res) => {
  const idPro = req.params.id; 
  connection.query("delete from product where idproduct=?", [idPro], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting an Product");
    } else {
      res.status(200).send("🎉 Product deleted!");
    }
  })
});


app.post("/product/add", (req, res) => {
  const { name, category, price } = req.body;
  connection.query(
    "INSERT INTO product(name, category, price ) VALUES(?, ?, ?)",
      [name, category, price ],
    (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error saving a product");
          } else {
            res.status(200).send("Successfully saved");
          }
        }
     );
});








app.listen(port, () => {
    console.log(`Server is runing on 3002`);
  });


