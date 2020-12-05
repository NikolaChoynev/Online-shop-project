import { OnChanges, Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { IProduct, IUser } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  inEditMode = false;

  get currentUser(): IUser {
    return this.userService.currentUser;
  }
  @Input()

  debtPrice = 0;

  boughtProducts = this.currentUser.bought;

  productList: IProduct[];


  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
   }

   ngOnChanges(): void {

   }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe();
    this.productService.loadProductsList().subscribe(productList => {
      for (let i = 0; i < this.boughtProducts.length; i++) {
        if (!productList.includes(this.boughtProducts[i])) {
          this.boughtProducts.splice(i, 1);
        }
      }
    });
    this.boughtProducts.forEach(product => {
      this.debtPrice += product.price;
    });
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

}
