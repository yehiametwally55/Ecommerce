import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent  {

  cartItems: any [] = [];
  cartPrice: string = ""
  constructor(private _productsService: ProductsService){
    this._productsService.getAllOrders().subscribe((response)=> {
      console.log(response.order);
      this.cartItems = response.order.cartItems;
    })
  }


  ngOnInit(): void {
    this._productsService.getAllOrders().subscribe((response)=> {
      console.log(response.order);
      this.cartItems = response.order.cartItems;

    })
  }
}
