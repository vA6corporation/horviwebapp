import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPartnershipsComponent } from './import-partnerships.component';

describe('ImportPartnershipsComponent', () => {
  let component: ImportPartnershipsComponent;
  let fixture: ComponentFixture<ImportPartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPartnershipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
