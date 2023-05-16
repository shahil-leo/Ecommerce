import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'productsBrand/:brand', component: ProductsComponent },
  { path: 'single/:id', component: SingleProductComponent },
  { path: 'allProducts', component: AllProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
