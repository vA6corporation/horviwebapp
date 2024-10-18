import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchShareholdersComponent } from './dialog-search-shareholders.component';

describe('DialogSearchShareholdersComponent', () => {
  let component: DialogSearchShareholdersComponent;
  let fixture: ComponentFixture<DialogSearchShareholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchShareholdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSearchShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
