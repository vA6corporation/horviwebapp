import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeacesComponent } from './seaces.component';

describe('SeacesComponent', () => {
  let component: SeacesComponent;
  let fixture: ComponentFixture<SeacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
