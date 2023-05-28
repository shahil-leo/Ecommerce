import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SideBarComponent } from './components/layouts/side-bar/side-bar.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { OrdersComponent } from './components/pages/orders/orders.component';

@NgModule({
  declarations: [
    ProfileComponent,
    WishlistComponent,
    SideBarComponent,
    NavbarComponent,
    OrdersComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule
  ]
})
export class ProfileModule { }
