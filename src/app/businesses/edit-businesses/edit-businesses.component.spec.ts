import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessesComponent } from './edit-businesses.component';

describe('EditBusinessesComponent', () => {
  let component: EditBusinessesComponent;
  let fixture: ComponentFixture<EditBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
