import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAccountRotationComponent } from './dialog-add-account-rotation.component';

describe('DialogAddAccountRotationComponent', () => {
  let component: DialogAddAccountRotationComponent;
  let fixture: ComponentFixture<DialogAddAccountRotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAccountRotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAccountRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
