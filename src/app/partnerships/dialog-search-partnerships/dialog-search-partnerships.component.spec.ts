import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchPartnershipsComponent } from './dialog-search-partnerships.component';

describe('DialogSearchPartnershipsComponent', () => {
  let component: DialogSearchPartnershipsComponent;
  let fixture: ComponentFixture<DialogSearchPartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchPartnershipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
