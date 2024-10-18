import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateGuarantiesComponent } from './dialog-create-guaranties.component';

describe('DialogCreateGuarantiesComponent', () => {
  let component: DialogCreateGuarantiesComponent;
  let fixture: ComponentFixture<DialogCreateGuarantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateGuarantiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateGuarantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
