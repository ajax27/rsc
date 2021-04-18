const express = require('express')
const shortId = require('shortid')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = process.env.PORT || 5000

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost/react-shop-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
)

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

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: { type: String, default: shortId.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    { timestamps: true }
  )
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

app.post('/api/orders', async (req, res) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: 'Please fill required fields!' })
  }
  const order = await Order(req.body).save()
  res.send(order)
})

app.delete('/api/products/:id', async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deleteProduct)
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))
