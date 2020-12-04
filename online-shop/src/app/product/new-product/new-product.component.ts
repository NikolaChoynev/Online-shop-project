import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  isLoading = false;

  constructor(
    private router: Router,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
  }

  submitHandler(formValue: { productName: string, description: string, price: number, imageUrl: string }): void {
    this.productService.saveProduct(formValue).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {

      }
    });
  }

  cancelHandler(): void {
    this.router.navigate(['/']);
  }

}
