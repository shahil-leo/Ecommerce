import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { UsersComponent } from './components/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: "", redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Products', component: ProductsComponent },
      { path: 'Category', component: CategoryComponent },
      { path: 'Orders', component: OrdersComponent },
      { path: 'Users', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
