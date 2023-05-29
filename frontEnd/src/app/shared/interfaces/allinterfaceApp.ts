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
}
// wishlist

export interface wishlistFullResponse {
  _id: string,
  userId: string,
  createdAt: string;
  updatedAt: string;
  __v: number;
  wishList: wishlist[]
}

export interface wishlist {
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

// brand
export interface fullBrandResponse {
  brand: string
}
//brand alll response
export interface BrandResponse {
  _id: string;
  categories: string;
  categoryImg: string;
  __v: number;
}

// categories

export interface CategoryResponse {
  _id: string;
  categories: string;
  categoryImg: string;
  __v: number;
}


