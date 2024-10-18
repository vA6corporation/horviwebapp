import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuretiesComponent } from './edit-sureties.component';

describe('EditSuretiesComponent', () => {
  let component: EditSuretiesComponent;
  let fixture: ComponentFixture<EditSuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
