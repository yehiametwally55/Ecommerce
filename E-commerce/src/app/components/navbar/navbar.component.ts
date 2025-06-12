import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  numOfCartItems:number = 0;
  constructor(public _AuthService:AuthService , private _productsService: ProductsService){
  _productsService.numOfCartItems.subscribe({
    next: (value)=>{
      console.log(value);
      
      this.numOfCartItems = value;
    }
  })
  }

}
