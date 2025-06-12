import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  searchTerm = ""
  products:any[] = [];

  displayCount: number;      
  readonly initialDisplayCount: number = 20;
  
  constructor(private  _Router:Router , private _ProductsService:ProductsService){
     this.displayCount = this.initialDisplayCount;
    if(localStorage.getItem('token') == null){
      _Router.navigate(['/login']);
    }   

    this._ProductsService.getAllProducts().subscribe( 
      (response) => {
        if (response && response.products && Array.isArray(response.products)) {
          this.products = response.products;
        } else {
          console.warn('Full products array not found in API response or structure incorrect:', response);
          this.products = [];
        }
        this.resetDisplayCount(); 
        console.log("All products loaded in HomeComponent:", this.products.length);
      },
      (error) => {
        console.error("Error fetching all products in HomeComponent:", error);
        this.products = [];
      }
    );}

  onSearchTermChange(): void {
    this.resetDisplayCount();
  }
  resetDisplayCount(): void {
    this.displayCount = this.initialDisplayCount;
  }

  showTheRest(filteredProductsLength: number): void {
    this.displayCount = filteredProductsLength;
  }
  showLess(): void {
    this.displayCount = this.initialDisplayCount; 
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
  }
   addProductToCart(productID:string){
    this._ProductsService.addProductToCart(productID).subscribe((response)=>{
      console.log(response);
      this._ProductsService.numOfCartItems.next(response.numOfCartItems);
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
