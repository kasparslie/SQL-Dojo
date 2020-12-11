
const express = require('express')
const productRouter = express.Router()
const connection = require('../config')
const bodyParser = require('body-parser')
productRouter.use(bodyParser.urlencoded({ extended: true }))
const cors = require('cors');
productRouter.use(cors())

productRouter.get("/", (req, res) => {
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

productRouter.get("/:id", (req, res) => {
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
  
  productRouter.get("/category/category", (req, res) => {
    connection.query(
      "SELECT category from product", 
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

productRouter.get("/category/search?", (req, res) => {
    idCateg=req.query.category
    console.log(req.query.category)
    connection.query(
      "SELECT * from product where category=?", [idCateg], 
      (err, results) => {
        if (err) {  
          console.log(err);
          res.status(500).send("Error retrieving data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });
  


  
  
  
productRouter.get("/category/:category", (req, res) => {
    const myCat= req.params.category
    console.log(req.params.category)
    connection.query(
      "SELECT * from product where category=?", [myCat], 
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
  
  

  
productRouter.put("/:id", (req, res) => {
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
  
productRouter.delete("/:id", (req, res) => {
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
  
  
productRouter.post("/add", (req, res) => {
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
module.exports=productRouter;