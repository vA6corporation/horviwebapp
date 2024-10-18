import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConstructionBusinessesComponent } from './dialog-construction-businesses.component';

describe('DialogConstructionBusinessesComponent', () => {
  let component: DialogConstructionBusinessesComponent;
  let fixture: ComponentFixture<DialogConstructionBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConstructionBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConstructionBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
