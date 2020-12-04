import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: IProduct = null;

  isLiked = false;

  editMode = false;

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(
    private productService: ProductService,
    activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    const id = activatedRoute.snapshot.params.id;
    productService.loadProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  ngOnInit(): void {
  }

  commentSubmitHandler(formValue: { text: string }, id: string): void {
    this.productService.addComment(formValue, id).subscribe({
      next: () => {
        this.productService.loadProduct(id).subscribe(product => {
          this.product = product;
        });
      },
      error: (err) => {
      }
    });
  }

  deleteComentHandler(commentId: string, productId: string): void {
    this.productService.deleteComment(commentId, productId).subscribe({
      next: () => {
        this.productService.loadProduct(productId).subscribe(product => {
          this.product = product;
        });
      },
      error: (err) => {
      }
    });
  }

  likeHandler(commentId: string, productId: string): void {
    this.productService.likeComment(commentId).subscribe({
      next: () => {
        this.isLiked = !this.isLiked;
        this.productService.loadProduct(productId).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  toggleEditMode(id): void {
    if (this.currentUser.comments.includes(id)) {
      this.editMode = !this.editMode;
    }

  }

  submitEditHandler(formValue: { text: string }, productId: string, commentId: string): void {
    this.productService.editComment(formValue, productId, commentId).subscribe({
      next: () => {
        this.editMode = !this.editMode;
        this.productService.loadProduct(productId).subscribe(product => {
          this.product = product;
        });
      }
    });
  }
}
