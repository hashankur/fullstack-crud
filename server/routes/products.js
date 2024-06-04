const { db } = require("../config/firebase.js");

const COLLECTION = "products";

async function createProduct(req, res) {
  try {
    // Add a new document with a generated id.
    await db
      .collection(COLLECTION)
      .add({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
      })
      .then((docRef) => {
        return res.status(201).json({
          message: "Product created successfully",
          id: docRef.id,
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getProducts(req, res) {
  const events = await db.collection(COLLECTION);
  events.get().then((querySnapshot) => {
    const result = querySnapshot.docs.map((doc) => {
      // Include the document ID
      return { id: doc.id, ...doc.data() };
    });
    return res.json({ result });
  });
}

function updateProduct(req, res) {
  const id = req.params.id;
  db.collection(COLLECTION)
    .doc(id)
    .update({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
    })
    .then((docRef) => {
      return res.json({
        message: "Product updated successfully",
        id,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
}

function deleteProduct(req, res) {
  const id = req.params.id;
  db.collection(COLLECTION)
    .doc(id)
    .delete()
    .then(() => {
      return res.json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
