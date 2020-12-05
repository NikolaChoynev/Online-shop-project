import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment, IProduct } from '../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  loadProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${apiUrl}/products`, { withCredentials: true });
  }

  loadProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${apiUrl}/products/${id}`, { withCredentials: true });
  }

  saveProduct(data: { productName: string, description: string, price: number, imageUrl: string }): Observable<IProduct> {
    return this.http.post<IProduct>(`${apiUrl}/products`, data, { withCredentials: true });
  }

  editProduct(data: { productName: string, description: string, price: number, imageUrl: string }, id: string): Observable<IProduct> {
    return this.http.put<IProduct>(`${apiUrl}/products/${id}`, data, { withCredentials: true });
  }

  deleteProduct(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${apiUrl}/products/${id}`, { withCredentials: true });
  }

  buyProduct(id: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}/products/${id}`, {}, { withCredentials: true });
  }

  addComment(data: { text: string }, id: string): Observable<IProduct> {
    return this.http.post<IProduct>(`${apiUrl}/products/comment/${id}`, data, { withCredentials: true });
  }

  deleteComment(commentId: string, productId: string): Observable<IComment> {
    return this.http.delete<IComment>(`${apiUrl}/products/${productId}/comment/${commentId}`, { withCredentials: true });
  }

  likeComment(commentId: string): Observable<any> {
    return this.http.put<any>(`${apiUrl}/likes/${commentId}`, {}, { withCredentials: true });
  }

  editComment(data: { text: string }, productId: string, commentId: string): Observable<IComment> {
    return this.http.put<IComment>(`${apiUrl}/products/${productId}/comment/${commentId}`, data, { withCredentials: true });
  }
}
