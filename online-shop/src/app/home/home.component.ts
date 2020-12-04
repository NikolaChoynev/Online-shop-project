import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { IProduct, IUser } from '../shared/interfaces';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  productList: IProduct[];

  constructor(
    private userService: UserService,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.productService.loadProductsList().subscribe(productList => {
      this.productList = productList;
    });
  }

}
