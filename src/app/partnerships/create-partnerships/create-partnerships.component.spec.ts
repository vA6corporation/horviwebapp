import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartnershipsComponent } from './create-partnerships.component';

describe('CreatePartnershipsComponent', () => {
  let component: CreatePartnershipsComponent;
  let fixture: ComponentFixture<CreatePartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
