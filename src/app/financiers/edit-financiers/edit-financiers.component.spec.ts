import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancierModelsComponent } from './edit-financiers.component';

describe('EditFinancierModelsComponent', () => {
  let component: EditFinancierModelsComponent;
  let fixture: ComponentFixture<EditFinancierModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFinancierModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancierModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
