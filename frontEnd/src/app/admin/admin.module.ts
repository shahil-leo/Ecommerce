import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from '../shared/interceptors/loading.interceptor';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SideBarComponent } from './components/layouts/side-bar/side-bar.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { UsersComponent } from './components/pages/users/users.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    ProductsComponent,
    AdminComponent,
    SideBarComponent,
    CategoryComponent,
    OrdersComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class AdminModule { }
