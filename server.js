const express = require('express')
const shortId = require('shortid')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
mongoose.connect('mongodb://localhost/react-shop-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
)

app.get('/api/products', async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body)
  const saveProduct = await newProduct.save()
  res.send(saveProduct)
})

app.delete('/api/products/:id', async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deleteProduct)
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port: ${port}`))
