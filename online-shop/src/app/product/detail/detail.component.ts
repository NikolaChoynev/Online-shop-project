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

  get product(): IProduct {
    return this.productService.currentProduct;
  }

  isLiked = false;

  editMode = false;

  message = '';

  messageComment = '';

  commentId = '';

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.loadProduct(id).subscribe();
  }

  commentSubmitHandler(formValue: { text: string }, id: string): void {
    this.productService.addComment(formValue, id).subscribe({
      next: () => {
        this.productService.loadProduct(id).subscribe();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteComentHandler(commentId: string, productId: string): void {
    this.productService.deleteComment(commentId, productId).subscribe({
      next: () => {
        this.productService.loadProduct(productId).subscribe();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  likeHandler(commentId: any, productId: string): void {
    this.productService.likeComment(commentId).subscribe(message => {
      this.messageComment = message.message;
      this.commentId = commentId;
      setTimeout(() => {
        this.messageComment = '';
      }, 3000);
      this.productService.loadProduct(productId).subscribe();
    });
  }

  toggleEditMode(id): void {
    this.commentId = id;
    this.editMode = !this.editMode;
  }

  submitEditHandler(formValue: { text: string }, productId: string, commentId: string): void {
    this.productService.editComment(formValue, productId, commentId).subscribe({
      next: () => {
        this.editMode = !this.editMode;
        this.productService.loadProduct(productId).subscribe();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteProductHandler(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  buyProductHandler(id: string): void {
    this.productService.buyProduct(id).subscribe(message => {
      this.message = message.message;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    });
  }

}
