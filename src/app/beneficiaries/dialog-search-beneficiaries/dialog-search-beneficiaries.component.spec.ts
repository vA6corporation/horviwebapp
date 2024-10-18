import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchBeneficiariesComponent } from './dialog-search-beneficiaries.component';

describe('DialogSearchBeneficiariesComponent', () => {
  let component: DialogSearchBeneficiariesComponent;
  let fixture: ComponentFixture<DialogSearchBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchBeneficiariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
