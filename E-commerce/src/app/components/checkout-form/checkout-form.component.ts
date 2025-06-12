import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
  cartId : string = "";

  constructor(private _productsService: ProductsService , private _ActivatedRoute: ActivatedRoute){
    _ActivatedRoute.paramMap.subscribe((params)=>{
     this.cartId = params.get("cartId")!;
    })
  }
  addressForm:FormGroup = new FormGroup({
    details : new FormControl(null),
    phone : new FormControl(null),
    city : new FormControl(null)
  })

  checkout(addressForm: FormGroup){
    console.log(addressForm.value);

    this._productsService.checkout(addressForm.value , this.cartId).subscribe((response)=>{
      console.log(response);
      location.href = response.session.url;
    });
  }
}
