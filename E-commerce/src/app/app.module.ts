import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {  RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { ProductComponent } from './components/product/product.component';
import { SearchPipe } from './Pipes/search.pipe';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AddHeaderInterceptor } from './add-header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundComponent,
    ProductComponent,
    ProductDetailsComponent,
    RegisterComponent,
    SearchPipe,
    CheckoutFormComponent,
    AllOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
