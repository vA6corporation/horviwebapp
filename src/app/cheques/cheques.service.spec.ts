import { TestBed } from '@angular/core/testing';

import { ChequesService } from './cheques.service';

describe('ChequesService', () => {
  let service: ChequesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
