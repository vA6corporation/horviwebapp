import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGuarantiesComponent } from './dialog-edit-guaranties.component';

describe('DialogEditGuarantiesComponent', () => {
  let component: DialogEditGuarantiesComponent;
  let fixture: ComponentFixture<DialogEditGuarantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditGuarantiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditGuarantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
