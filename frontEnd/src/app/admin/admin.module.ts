import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { AdminComponent } from './admin.component';
import { SideBarComponent } from './components/layouts/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/pages/category/category.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
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
  ]
})
export class AdminModule { }
