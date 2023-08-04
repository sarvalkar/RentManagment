import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuildingComponent } from './building/building.component';
import { FlatComponent } from './flat/flat.component';
import { RenterComponent } from './renter/renter.component';
import { RentpayComponent } from './rentpay/rentpay.component';

const routes: Routes = [
  {redirectTo:'login',path:'',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'building', component:BuildingComponent},
  {path:'flat', component:FlatComponent},
  {path:'renter', component:RenterComponent},
  {path:'rentpay',component:RentpayComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
