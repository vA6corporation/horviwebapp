import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShareholdersComponent } from './create-shareholders.component';

describe('CreateShareholdersComponent', () => {
  let component: CreateShareholdersComponent;
  let fixture: ComponentFixture<CreateShareholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShareholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
