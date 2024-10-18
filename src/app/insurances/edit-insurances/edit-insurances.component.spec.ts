import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsurancesComponent } from './edit-insurances.component';

describe('EditInsurancesComponent', () => {
  let component: EditInsurancesComponent;
  let fixture: ComponentFixture<EditInsurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInsurancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
