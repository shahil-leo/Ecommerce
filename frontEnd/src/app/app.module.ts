import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/pages/register/register.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { LoadingComponent } from './components/layouts/loading/loading.component'
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { HeroSectionComponent } from './components/layouts/hero-section/hero-section.component';
import { CategoriesComponent } from './components/layouts/categories/categories.component';
import { SmCategoryComponent } from './components/layouts/sm-category/sm-category.component';
import { BrandComponent } from './components/layouts/brand/brand.component';
import { FaqComponent } from './components/layouts/faq/faq.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { CartsComponent } from './components/pages/carts/carts.component';
import { AddressComponent } from './components/pages/address/address.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LoadingComponent,
    HeroSectionComponent,
    CategoriesComponent,
    SmCategoryComponent,
    BrandComponent,
    FaqComponent,
    FooterComponent,
    ProductsComponent,
    SingleProductComponent,
    AllProductsComponent,
    CartsComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AdminModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
