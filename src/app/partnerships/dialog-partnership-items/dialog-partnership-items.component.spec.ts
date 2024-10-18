import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPartnershipItemsComponent } from './dialog-partnership-items.component';

describe('DialogPartnershipItemsComponent', () => {
  let component: DialogPartnershipItemsComponent;
  let fixture: ComponentFixture<DialogPartnershipItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPartnershipItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPartnershipItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
