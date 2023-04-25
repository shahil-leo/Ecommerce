const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    categories: {
        type: Array,
    },
    reviews: {
        type: Array,
    }
})

module.exports = mongoose.model('products', productSchema)


//  {
//   "_id": ObjectId("product_id_1"),
//   "name": "Product 1",
//   "description": "This is product 1",
//   "price": 9.99,
//   "stock": 10,
//   "categories": ["category1", "category2"],
//   "reviews": [
//     {
//       "user_id": ObjectId("user_id"),
//       "rating": 5,
//       "comment": "Great product!"
//     },
//     {
//       "user_id": ObjectId("user_id"),
//       "rating": 3,
//       "comment": "Average product"
//     }
//   ]
// }

// {
//   "_id": ObjectId("product_id_2"),
//   "name": "Product 2",
//   "description": "This is product 2",
//   "price": 19.99,
//   "stock": 5,
//   "categories": ["category2", "category3"],
//   "reviews": []
// }