import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuretiesComponent } from './create-sureties.component';

describe('CreateSuretiesComponent', () => {
  let component: CreateSuretiesComponent;
  let fixture: ComponentFixture<CreateSuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
