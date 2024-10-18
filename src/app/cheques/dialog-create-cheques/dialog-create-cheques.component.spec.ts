import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateChequesComponent } from './dialog-create-cheques.component';

describe('DialogCreateChequesComponent', () => {
  let component: DialogCreateChequesComponent;
  let fixture: ComponentFixture<DialogCreateChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateChequesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
