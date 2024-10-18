import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFacilityCreditsComponent } from './dialog-facility-credits.component';

describe('DialogFacilityCreditsComponent', () => {
  let component: DialogFacilityCreditsComponent;
  let fixture: ComponentFixture<DialogFacilityCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFacilityCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFacilityCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
