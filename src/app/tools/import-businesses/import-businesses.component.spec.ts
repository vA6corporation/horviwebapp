import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBusinessesComponent } from './import-businesses.component';

describe('ImportBusinessesComponent', () => {
  let component: ImportBusinessesComponent;
  let fixture: ComponentFixture<ImportBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportBusinessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
