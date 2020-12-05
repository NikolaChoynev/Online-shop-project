import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  @Input() boughtProduct: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
