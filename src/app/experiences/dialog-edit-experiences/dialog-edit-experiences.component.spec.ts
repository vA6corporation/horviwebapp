import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditExperiencesComponent } from './dialog-edit-experiences.component';

describe('DialogEditExperiencesComponent', () => {
  let component: DialogEditExperiencesComponent;
  let fixture: ComponentFixture<DialogEditExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
