import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancierModelsComponent } from './create-financiers.component';

describe('CreateFinancierModelsComponent', () => {
  let component: CreateFinancierModelsComponent;
  let fixture: ComponentFixture<CreateFinancierModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFinancierModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFinancierModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
