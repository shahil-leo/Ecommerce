import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/layouts/brand/brand.component';
import { CategoriesComponent } from './components/layouts/categories/categories.component';
import { FaqComponent } from './components/layouts/faq/faq.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeroSectionComponent } from './components/layouts/hero-section/hero-section.component';
import { LoadingComponent } from './components/layouts/loading/loading.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SmCategoryComponent } from './components/layouts/sm-category/sm-category.component';
import { AddressComponent } from './components/pages/address/address.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { CartsComponent } from './components/pages/carts/carts.component';
import { ForgotComponent } from './components/pages/forgot/forgot.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { ProfileModule } from './profile/profile.module';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';


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
    ForgotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      newestOnTop: false,
      progressAnimation: 'decreasing',
      progressBar: true,
      easeTime: 1000,
      easing: 'ease-in',
      tapToDismiss: true,
    }
    ),
    AdminModule,
    ProfileModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  exports: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
