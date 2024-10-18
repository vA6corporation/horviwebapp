import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchFinanciersComponent } from './dialog-search-financiers.component';

describe('DialogSearchFinanciersComponent', () => {
  let component: DialogSearchFinanciersComponent;
  let fixture: ComponentFixture<DialogSearchFinanciersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchFinanciersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchFinanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
