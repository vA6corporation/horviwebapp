import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailSeacesComponent } from './dialog-detail-seaces.component';

describe('DialogDetailSeacesComponent', () => {
  let component: DialogDetailSeacesComponent;
  let fixture: ComponentFixture<DialogDetailSeacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDetailSeacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetailSeacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
