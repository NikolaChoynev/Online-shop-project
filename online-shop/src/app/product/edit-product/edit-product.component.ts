import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: IProduct = null;

  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    const id = activatedRoute.snapshot.params.id;
    productService.loadProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  ngOnInit(): void {
  }

  submitHandler(formValue: { productName: string, description: string, price: number, imageUrl: string }, id: string): void {
    this.productService.editProduct(formValue, id).subscribe({
      next: () => {
        this.router.navigate(['/product/detail/' + id]);
      },
      error: (err) => {

      }
    });
  }

  cancelHandler(id: string): void {
    this.router.navigate(['/product/detail/' + id]);
  }

}
