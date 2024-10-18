import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShareholdersComponent } from './edit-shareholders.component';

describe('EditShareholdersComponent', () => {
  let component: EditShareholdersComponent;
  let fixture: ComponentFixture<EditShareholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShareholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
