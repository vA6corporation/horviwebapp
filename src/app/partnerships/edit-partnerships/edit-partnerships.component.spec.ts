import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnershipsComponent } from './edit-partnerships.component';

describe('EditPartnershipsComponent', () => {
  let component: EditPartnershipsComponent;
  let fixture: ComponentFixture<EditPartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartnershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
