import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brands: any[] = [];
constructor(private _HttpClient:HttpClient ,private _productsService:ProductsService ){
  _productsService.getAllBrands().subscribe((brands) =>{
    console.log(brands.brands);
    this.brands = brands.brands
  })
}
}
