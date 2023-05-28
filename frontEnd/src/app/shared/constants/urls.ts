
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

// payment method
export const stripe = BASE_URL + 'order/stripe'
export const addOrder = BASE_URL + 'order/create'
