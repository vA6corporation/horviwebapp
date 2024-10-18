import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTendersComponent } from './edit-tenders.component';

describe('EditTendersComponent', () => {
  let component: EditTendersComponent;
  let fixture: ComponentFixture<EditTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
