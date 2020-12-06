import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSellesComponent } from './user-selles.component';

describe('UserSellesComponent', () => {
  let component: UserSellesComponent;
  let fixture: ComponentFixture<UserSellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSellesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
