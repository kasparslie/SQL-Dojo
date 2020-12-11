
const express = require("express");
const cors = require('cors');
const connection = require("./config")
const port = 3002;
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser())

require('dotenv').config()
const productRouter = require('./routes/product')


app.use('/products', productRouter)








app.listen(port, () => {
    console.log(`Server is runing on 3002`);
  });


