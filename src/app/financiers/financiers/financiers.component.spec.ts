import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierModelsComponent } from './financiers.component';

describe('FinancierModelsComponent', () => {
  let component: FinancierModelsComponent;
  let fixture: ComponentFixture<FinancierModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancierModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
