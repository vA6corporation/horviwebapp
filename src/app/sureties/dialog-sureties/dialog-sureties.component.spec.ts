import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuretiesComponent } from './dialog-sureties.component';

describe('DialogSuretiesComponent', () => {
  let component: DialogSuretiesComponent;
  let fixture: ComponentFixture<DialogSuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
