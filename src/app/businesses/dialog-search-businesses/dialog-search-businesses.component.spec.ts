import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchBusinessesComponent } from './dialog-search-businesses.component';

describe('DialogSearchBusinessesComponent', () => {
  let component: DialogSearchBusinessesComponent;
  let fixture: ComponentFixture<DialogSearchBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchBusinessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
