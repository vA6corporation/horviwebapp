import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentsComponent } from './dialog-payments.component';

describe('DialogPaymentsComponent', () => {
  let component: DialogPaymentsComponent;
  let fixture: ComponentFixture<DialogPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
