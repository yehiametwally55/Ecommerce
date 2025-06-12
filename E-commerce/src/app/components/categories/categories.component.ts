import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any[] = [];
constructor(private _productsService:ProductsService ){
  _productsService.getAllCategories().subscribe((categories) =>{
    console.log(categories.category);
    this.categories = categories.category
  })
}

}
