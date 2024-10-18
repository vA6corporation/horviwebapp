import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersComponent } from './shareholders.component';

describe('ShareholdersComponent', () => {
  let component: ShareholdersComponent;
  let fixture: ComponentFixture<ShareholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
