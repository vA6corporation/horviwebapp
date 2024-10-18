import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemplatesComponent } from './dialog-templates.component';

describe('DialogTemplatesComponent', () => {
  let component: DialogTemplatesComponent;
  let fixture: ComponentFixture<DialogTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
