import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inEditMode = false;


  constructor() { }

  ngOnInit(): void {
  }

  toggleEditMode(): void{
    this.inEditMode = !this.inEditMode;
  }

}
