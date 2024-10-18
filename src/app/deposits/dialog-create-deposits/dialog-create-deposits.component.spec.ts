import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateDepositsComponent } from './dialog-create-deposits.component';

describe('DialogCreateDepositsComponent', () => {
  let component: DialogCreateDepositsComponent;
  let fixture: ComponentFixture<DialogCreateDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateDepositsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
