import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommercialsComponent } from './edit-commercials.component';

describe('EditCommercialsComponent', () => {
  let component: EditCommercialsComponent;
  let fixture: ComponentFixture<EditCommercialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCommercialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
