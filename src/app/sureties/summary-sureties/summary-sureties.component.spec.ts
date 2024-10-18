import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySuretiesComponent } from './summary-sureties.component';

describe('SummarySuretiesComponent', () => {
  let component: SummarySuretiesComponent;
  let fixture: ComponentFixture<SummarySuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarySuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarySuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
