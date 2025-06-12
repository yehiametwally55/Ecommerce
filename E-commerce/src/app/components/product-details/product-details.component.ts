import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
 import { OwlOptions } from 'ngx-owl-carousel-o'
@Component({
  selector: 'app-productDetails',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {

  productID: string = "";

  productDetails: any;


  constructor(private _ActivatedRoute: ActivatedRoute , private _ProductsService:ProductsService){
    _ActivatedRoute.paramMap.subscribe((params)=>{
      this.productID = params.get('id') ||"";

      _ProductsService.getSpecificProduct(this.productID).subscribe((product) =>{
        console.log(product.products);
        this.productDetails = product.products;
      })
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
    },
    nav: true
  }
  addProductToCart(productID: string){
    this._ProductsService.addProductToCart(productID).subscribe((response)=>{
      console.log(response);
      this._ProductsService.numOfCartItems.next(response.numOfCartItems);
    })
  }
}
