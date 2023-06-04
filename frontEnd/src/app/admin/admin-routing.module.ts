import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { UsersComponent } from './components/pages/users/users.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: "", redirectTo: 'Dashboard', pathMatch: 'full', },
      { path: 'adminLogin', component: AdminLoginComponent },
      { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'Products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'Category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'Orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'Users', component: UsersComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
