import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurancesComponent } from './create-insurances.component';

describe('CreateInsurancesComponent', () => {
  let component: CreateInsurancesComponent;
  let fixture: ComponentFixture<CreateInsurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
