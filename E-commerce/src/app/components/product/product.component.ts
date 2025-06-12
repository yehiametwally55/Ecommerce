import { Component, Input } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() product:any;
  products:any[] = []
  constructor(private _productsService: ProductsService, private  _Router:Router){
     if(localStorage.getItem('token') == null){
      _Router.navigate(['/login']);
    }   

   _productsService.getAllProducts().subscribe(
      (response) => {
        if (response && response.products && Array.isArray(response.products)) {
          this.products = response.products;
        } else {
          console.warn('Products array not found in API response or structure is incorrect in HomeComponent:', response);
          this.products = [];
        }
        console.log("Products in HomeComponent after API call:", this.products);
      },
      (error) => {
        console.error("Error fetching products in HomeComponent:", error);
        this.products = []; 
      }
    );
  }
  

  addProductToCart(productID:string){
    this._productsService.addProductToCart(productID).subscribe((response)=>{
      console.log(response);
      
      this._productsService.numOfCartItems.next(response.numOfCartItems);
    })
  }
  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        }
    }
  }
}
