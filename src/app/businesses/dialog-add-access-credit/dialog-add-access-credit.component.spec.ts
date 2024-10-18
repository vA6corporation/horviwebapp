import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAccessCreditComponent } from './dialog-add-access-credit.component';

describe('DialogAddAccessCreditComponent', () => {
  let component: DialogAddAccessCreditComponent;
  let fixture: ComponentFixture<DialogAddAccessCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAccessCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAccessCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
