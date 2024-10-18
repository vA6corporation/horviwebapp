import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBirthdayComponent } from './dialog-birthday.component';

describe('DialogBirthdayComponent', () => {
  let component: DialogBirthdayComponent;
  let fixture: ComponentFixture<DialogBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
