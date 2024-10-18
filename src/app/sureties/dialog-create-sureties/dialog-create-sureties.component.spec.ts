import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateSuretiesComponent } from './dialog-create-sureties.component';

describe('DialogCreateSuretiesComponent', () => {
  let component: DialogCreateSuretiesComponent;
  let fixture: ComponentFixture<DialogCreateSuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateSuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateSuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
