import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-selles',
  templateUrl: './user-selles.component.html',
  styleUrls: ['./user-selles.component.css']
})
export class UserSellesComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
