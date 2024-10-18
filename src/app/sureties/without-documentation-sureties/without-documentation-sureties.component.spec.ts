import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutDocumentationSuretiesComponent } from './without-documentation-sureties.component';

describe('WithoutDocumentationSuretiesComponent', () => {
  let component: WithoutDocumentationSuretiesComponent;
  let fixture: ComponentFixture<WithoutDocumentationSuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutDocumentationSuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutDocumentationSuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
