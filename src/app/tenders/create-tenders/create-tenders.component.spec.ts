import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTendersComponent } from './create-tenders.component';

describe('CreateTendersComponent', () => {
  let component: CreateTendersComponent;
  let fixture: ComponentFixture<CreateTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
