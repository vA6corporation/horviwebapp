import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuretiesComponent } from './sureties.component';

describe('SuretiesComponent', () => {
  let component: SuretiesComponent;
  let fixture: ComponentFixture<SuretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
