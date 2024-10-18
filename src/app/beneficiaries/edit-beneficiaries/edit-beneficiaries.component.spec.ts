import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneficiariesComponent } from './edit-beneficiaries.component';

describe('EditBeneficiariesComponent', () => {
  let component: EditBeneficiariesComponent;
  let fixture: ComponentFixture<EditBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBeneficiariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
