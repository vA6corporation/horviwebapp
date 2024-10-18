import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMainProvidersComponent } from './dialog-add-main-providers.component';

describe('DialogAddMainProvidersComponent', () => {
  let component: DialogAddMainProvidersComponent;
  let fixture: ComponentFixture<DialogAddMainProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddMainProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddMainProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
