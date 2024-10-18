import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchTendersComponent } from './dialog-search-tenders.component';

describe('DialogSearchTendersComponent', () => {
  let component: DialogSearchTendersComponent;
  let fixture: ComponentFixture<DialogSearchTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
