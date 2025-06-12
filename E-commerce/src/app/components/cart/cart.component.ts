import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartProducts: any[] = []; 
  cartId: string = "";
  totalCartPrice: number = 0;
  isLoading: boolean = true;
  counterSetTimeout: any; 

  constructor(private _ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails(): void {
    this.isLoading = true;
    this._ProductsService.getCartProducts().subscribe({
      next: (response: any) => { 
        console.log("Full API Response in CartComponent:", response);
        if (response && response.cart) {
          this.cartProducts = response.cart.cartItems || [];
          this.cartId = response.cart._id || "";
          this.totalCartPrice = response.cart.totalPrice || 0;
          console.log("Assigned cartProducts:", this.cartProducts);
        } else {
          console.warn("Cart or cartItems not found in response:", response);
          this.cartProducts = [];
          this.cartId = "";
          this.totalCartPrice = 0;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching cart products:", err);
        this.cartProducts = [];
        this.cartId = "";
        this.totalCartPrice = 0;
        this.isLoading = false;
      }
    });
  }

  updateProductQuantity(productId:string , productCount:number){
    if(productCount == 0){
      this.removeProductFromCart(productId)
    }
    else{
      clearTimeout(this.counterSetTimeout);

     this.counterSetTimeout = setTimeout(() => {
        this._ProductsService.updateProductQuantity(productId, productCount).subscribe({
            next: (response) => {
                console.log('Update quantity response:', response);
                this.loadCartDetails(); 
            },
            error: (err) => {
                console.error('Error updating product quantity:', err);
                this.loadCartDetails();
            }
        });
      }, 500);
    } 
  }
 removeProductFromCart(cartItemId: string) {
    console.log('Attempting to remove cartItem with ID:', cartItemId);
    this._ProductsService.removeProductFromCart(cartItemId).subscribe({
        next: (response) => {
            console.log('Remove item response:', response);
            this.loadCartDetails(); 
        },
        error: (err) => {
            console.error('Error removing item from cart:', err);
            this.loadCartDetails();
        }
    });
}

  removeCartProducts(){
    this.isLoading = true;
  this._ProductsService.clearCart().subscribe({
    next: (response) => {
      console.log('Clear cart response:', response);
      this.loadCartDetails();
    },
    error: (err) => {
      console.error('Error clearing cart:', err);
      this.isLoading = false;
      this.loadCartDetails();
    }
  });
}
  }

