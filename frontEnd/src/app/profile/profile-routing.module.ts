import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { SingleProfileComponent } from './components/pages/single-profile/single-profile.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: "", redirectTo: 'single', pathMatch: 'full' },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'single', component: SingleProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
