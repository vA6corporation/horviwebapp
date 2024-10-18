import { TestBed } from '@angular/core/testing';

import { SeacesService } from './seaces.service';

describe('SeacesService', () => {
  let service: SeacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
