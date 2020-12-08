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
  filteredProducts: IProduct[];
  // tslint:disable-next-line: variable-name
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.filtereProducts(value);
  }

  filtereProducts(searchString: string): IProduct[] {
    return this.productList.filter(product =>
      product.productName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.productService.loadProductsList().subscribe(productList => {
      this.productList = productList;
      this.filteredProducts = productList;

    });
  }

}
