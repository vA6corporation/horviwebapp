import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSalesmixComponent } from './dialog-add-salesmix.component';

describe('DialogAddSalesmixComponent', () => {
  let component: DialogAddSalesmixComponent;
  let fixture: ComponentFixture<DialogAddSalesmixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSalesmixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSalesmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
