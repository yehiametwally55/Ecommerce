import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import {  NotfoundComponent} from './components/notfound/notfound.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home',canActivate: [AuthGuard] ,component: HomeComponent},
  {path:'product',canActivate: [AuthGuard] ,component: ProductComponent},
  {path:'login' , component: LoginComponent},
  {path:'register' , component: RegisterComponent},
  {path:'cart' ,canActivate: [AuthGuard],component: CartComponent},
  {path:'category' ,canActivate: [AuthGuard], component: CategoriesComponent},
  {path:'product/:id' ,canActivate: [AuthGuard], component: ProductDetailsComponent},
  {path:'brand' ,canActivate: [AuthGuard], component: BrandsComponent},
  {path:'checkout/:cartId' ,canActivate: [AuthGuard], component: CheckoutFormComponent},
  {path:'settings', loadChildren:()=> import('./settings/settings.module').then((m)=>m.SettingsModule)},
  {path:'order' ,canActivate: [AuthGuard], component: AllOrdersComponent},
  {path:'**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash : true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
