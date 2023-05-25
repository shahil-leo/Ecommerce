import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/pages/address/address.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { CartsComponent } from './components/pages/carts/carts.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'featured', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'productsBrand/:brand', component: ProductsComponent },
  { path: 'single/:id', component: SingleProductComponent },
  { path: 'allProducts', component: AllProductsComponent },
  { path: 'carts', component: CartsComponent },
  { path: 'address', component: AddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
