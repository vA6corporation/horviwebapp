import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddGuarantiesComponent } from './dialog-add-guaranties.component';

describe('DialogAddGuarantiesComponent', () => {
  let component: DialogAddGuarantiesComponent;
  let fixture: ComponentFixture<DialogAddGuarantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddGuarantiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddGuarantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
