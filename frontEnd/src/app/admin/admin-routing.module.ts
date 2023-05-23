import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { UsersComponent } from './components/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'adminDashboard', component: DashboardComponent },
      { path: 'adminProducts', component: ProductsComponent },
      { path: 'adminCategory', component: CategoryComponent },
      { path: 'adminOrders', component: OrdersComponent },
      { path: 'adminUsers', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
