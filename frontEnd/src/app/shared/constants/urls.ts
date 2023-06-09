
// Base url of everything
export const BASE_URL = "http://localhost:4000/"

// login/register
export const login = BASE_URL + 'auth/login'
export const register = BASE_URL + 'auth/register'

// category
export const allCategory = BASE_URL + 'product/Allcategory'
export const allCategories = BASE_URL + 'category/every'
export const findCategory = BASE_URL + 'product/findCategory'

// products
export const allProducts = BASE_URL + 'product/all'

// brand
export const getAllBrand = BASE_URL + 'product/findBrand'
export const findBrand = BASE_URL + 'product/findBrandProduct'
export const findSingleProduct = BASE_URL + 'product/single'

// cart
export const addCart = BASE_URL + 'cart/create'
export const deleteAllCart = BASE_URL + 'cart/deleteAll'
export const deleteOneCart = BASE_URL + 'cart/delete'
export const getCart = BASE_URL + 'cart/getCart'

// wishlist
export const addWishList = BASE_URL + 'wishlist/create'
export const getWishlist = BASE_URL + 'wishlist/get'
export const deleteAllWishList = BASE_URL + 'wishlist/deleteAll'
export const deleteOneWishList = BASE_URL + 'wishlist/delete'

// update quantity of the products
export const updatedQuantity = BASE_URL + 'cart/updateNumber'

// profile getting using userId
export const profileOne = BASE_URL + 'profile/get'

// forgot password
export const forgotPass = BASE_URL + 'auth/forgot'
export const checkCode = BASE_URL + 'auth/check'

// payment method
export const stripe = BASE_URL + 'order/stripe'
export const addOrder = BASE_URL + 'order/create'


// admin panel

// totalUser
export const totalUser = BASE_URL + 'user/allUser'

// getTotalProducts
export const totalProducts = BASE_URL + 'product/all'

// getAllOrders
export const everyOrder = BASE_URL + 'order/all'

// getSomeOrders
export const someOrders = BASE_URL + 'order/allSome'

// getSomeCategory
export const someCategory = BASE_URL + 'category/everySome'

// getAllCategory
export const allCategoryAdmin = BASE_URL + 'category/every'

// getAllProducts
export const getAllProductAdmin = BASE_URL + 'product/all'

// deleteOneProduct
export const deleteOneProduct = BASE_URL + 'product/delete'

// addOneProduct
export const addOneProductAdmin = BASE_URL + 'product/create'

// addOneCategory
export const addOneCategory = BASE_URL + 'category/add'

// deleteOneCategory
export const deleteOneCategory = BASE_URL + 'category/delete'

// getOneCategory
export const getOneCategory = BASE_URL + 'category/single'

// updateOneCategory
export const updateOneCategory = BASE_URL + 'category/update'

// getAllOrder
export const getAllOrder = BASE_URL + 'order/all'

// getAllUser
export const getAllUser = BASE_URL + 'user/allUser'

// deleteOneUser
export const deleteOneUser = BASE_URL + 'user/delete'

// getOneOrder
export const getOneOrder = BASE_URL + 'order/oneProduct'

// EditOneProduct
export const getOneProductEdit = BASE_URL + 'singleProduct'

// updateOneProduct
export const updateOneProduct = BASE_URL + 'update'

// deleteOneOrder
export const deleteOneOrder = BASE_URL + 'delete'

// updating status
export const updateStatus = BASE_URL + 'order/update'

// authToken
export const authToken = BASE_URL + 'auth/token'
