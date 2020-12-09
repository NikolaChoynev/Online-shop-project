import { OnChanges, Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
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

  errorMessage = '';

  isLoading = false;


  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  get boughtProducts(): IProduct[] {
    return this.userService.boughtProducts;
  }

  get debtPrice(): number {
    return this.userService.debtPrice;
  }
  constructor(
    private userService: UserService,
  ) {
  }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe();
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: { email: string, username: string, address: string }): void {
    this.isLoading = true;
    this.userService.editProfile(data).subscribe({
      next: () => {
        this.inEditMode = false;
        this.isLoading = false;
        this.userService.getCurrentUserProfile().subscribe();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

}
