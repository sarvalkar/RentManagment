import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { BuildingComponent } from './building/building.component';
import { FlatComponent } from './flat/flat.component';
import { RenterComponent } from './renter/renter.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { DialogforflatComponent } from './dialogforflat/dialogforflat.component';
import {MatSelectModule} from '@angular/material/select';
import { DialogforRenterComponent } from './dialogfor-renter/dialogfor-renter.component';
import { DialogforRentPayComponent } from './dialogfor-rent-pay/dialogfor-rent-pay.component';
import { RentpayComponent } from './rentpay/rentpay.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    BuildingComponent,
    FlatComponent,
    RenterComponent,
    DialogComponent,
    DialogforflatComponent,
    DialogforRenterComponent,
    DialogforRentPayComponent,
    RentpayComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,MatIconModule,MatMenuModule,MatSidenavModule,MatListModule,MatSelectModule,
    MatButtonModule,MatCardModule,MatNativeDateModule,MatDatepickerModule,MatFormFieldModule,MatDividerModule,MatDialogModule, MatTableModule,
    MatCardModule,FormsModule,MatInputModule,DragDropModule,MatToolbarModule,MatIconModule, BrowserAnimationsModule, MatPaginatorModule, MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
