// cart response
export interface cartFullResponse {
  _id: string,
  userId: string,
  createdAt: string;
  updatedAt: string;
  __v: number;
  carts: cartItem[]
}
export interface cartItem {
  brand: string;
  categories: string[];
  color: string;
  description: string;
  image: string;
  prize: number;
  quantity: number;
  size: number;
  title: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface addCart {
  carts: cartItem[];
  createdAt?: string,
  updatedAt?: string,
  userId: string
  _v: number
  _id?: string
}

// user
export interface fullUserRes {
  email: string,
  firstName: string,
  isAdmin: boolean,
  lastName: string,
  password: string,
  recoveryCode?: string,
  updatedAt: string,
  _id: string,
}

// brand
export interface brand {
  brand: string
}

export interface fullBrandResponse {
  brand: string
}


// wishlist

export interface addWishlist {
  wishList: cartItem[];
  createdAt?: string,
  updatedAt?: string,
  userId: string
  __v: number
  _id?: string
}

export interface wishlistFullResponse {
  _id: string,
  userId: string,
  createdAt: string;
  updatedAt: string;
  __v: number;
  wishList: cartItem[]
}


// single product
export interface singleProduct {
  _id: string,
  title: string,
  size: number,
  quantity: number,
  prize: number,
  image: string,
  color: string,
  categories: string[]
  brand: string
}
// login Data
export interface loginData {
  email: string,
  password: string
}
export interface forgotData {
  email: string,
  code: string
}
export interface loginUserToken {
  accessToken: string,
  createdAt: string,
  email: string,
  firstName: string,
  isAdmin: boolean,
  lastName: string,
  recoveryCode: number,
  updatedAt: string,
  _id: string,
  _v: number
}
// registerData

export interface registerUser {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  confirmPassword: string,

}
export interface registerConfirmUser {
  createdAt: string,
  email: string,
  firstName: string,
  isAdmin: boolean,
  lastName: string,
  recoveryCode: number,
  updatedAt: string,
  _id: string,
  _v: number
}

// categories
export interface CategoryResponse {
  _id: string;
  categories: string;
  categoryImg: string;
  __v: number;
}

export interface CategoryFullRes {
  categories: string,
  categoryImg: string,
  _id: string,

}

// order
export interface fullOrderRes {
  amount: string,
  createdAt?: string,
  order: address[],
  status: string,
  updatedAt?: string,
  userId: string,
  _id: string,
}
// address
export interface address {
  address: string,
  alternativePhone?: number,
  city: string,
  email: string,
  firstName: string,
  landmark?: string,
  lastName: string,
  locality: string,
  phone: number,
  pincode: number,
  products?: cartItem[],
  state: string,
  _id: string
}
