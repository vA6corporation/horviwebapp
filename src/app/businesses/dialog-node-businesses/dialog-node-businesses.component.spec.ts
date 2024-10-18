import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNodeBusinessesComponent } from './dialog-node-businesses.component';

describe('DialogNodeBusinessesComponent', () => {
  let component: DialogNodeBusinessesComponent;
  let fixture: ComponentFixture<DialogNodeBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNodeBusinessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNodeBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
