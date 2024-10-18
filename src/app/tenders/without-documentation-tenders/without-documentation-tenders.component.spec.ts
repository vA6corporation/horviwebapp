import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutDocumentationTendersComponent } from './without-documentation-tenders.component';

describe('WithoutDocumentationTendersComponent', () => {
  let component: WithoutDocumentationTendersComponent;
  let fixture: ComponentFixture<WithoutDocumentationTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutDocumentationTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutDocumentationTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
