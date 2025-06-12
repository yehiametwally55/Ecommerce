import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 baseUrl = "http://localhost:3000";

 numOfCartItems:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient , private _Router:Router) { 
    this.getCartProducts().subscribe((res)=>{
      this.numOfCartItems.next(res.numOfCartItems)
      console.log(res);
    }
    )
  }

  getAllOrders(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/order/`);
  }
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + "/product/getAll");
  }

  getSpecificProduct (productID: string): Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/product/getById/${productID}`);
  }
  getAllCategories() : Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/category/getAll`);
  }
  getAllBrands(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/brand/getBrands`)
  }
 addProductToCart(productId: string): Observable<any> {
      const token = localStorage.getItem('token') || "";
      const body = {
        product: productId
      };
      const headers = new HttpHeaders({
        'token': token
      });
 return this._HttpClient.post(this.baseUrl + `/cart/`, body, { headers: headers });
}

  getCartProducts() : Observable<any> {
    return this._HttpClient.get(this.baseUrl + `/cart/` , {
      
    })
  }
   updateProductQuantity(productId: string, newQuantity: number): Observable<any> {
  const token = localStorage.getItem('token') || "";
  const headers = new HttpHeaders({
    'token': token,
    'Content-Type': 'application/json'
  });

  const body = {
    product: productId,  
    quantity: newQuantity 
  };
  return this._HttpClient.put(this.baseUrl + `/cart/`, body, { headers: headers });
}

  removeProductFromCart(productId:string): Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/cart/${productId}`, {
    })
  }
  
 clearCart(): Observable<any> {
  const token = localStorage.getItem('token') || "";
  const headers = new HttpHeaders({
    'token': token
  });
  return this._HttpClient.delete(this.baseUrl + `/cart/clear`, { headers: headers });
}
  checkout(shippingAddress: any , cartId:string): Observable<any>{
  return this._HttpClient.post(`/checkout/${cartId}` , 
    {
      "shippingAddress": shippingAddress
  },{
    
  })
  }
}
