import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateExperiencesComponent } from './dialog-create-experiences.component';

describe('DialogCreateExperiencesComponent', () => {
  let component: DialogCreateExperiencesComponent;
  let fixture: ComponentFixture<DialogCreateExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateExperiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
