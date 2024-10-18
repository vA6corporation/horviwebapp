import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTrialsComponent } from './dialog-add-trials.component';

describe('DialogAddTrialsComponent', () => {
  let component: DialogAddTrialsComponent;
  let fixture: ComponentFixture<DialogAddTrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTrialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
