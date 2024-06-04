const express = require("express");
const cors = require("cors");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./routes/products.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Application is online");
});

app.post("/products", createProduct);
app.get("/products", getProducts);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
