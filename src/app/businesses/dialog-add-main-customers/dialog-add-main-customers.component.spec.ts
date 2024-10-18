import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMainCustomersComponent } from './dialog-add-main-customers.component';

describe('DialogAddMainCustomersComponent', () => {
  let component: DialogAddMainCustomersComponent;
  let fixture: ComponentFixture<DialogAddMainCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMainCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMainCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
