import { TestBed } from '@angular/core/testing';

import { DepositsService } from './deposits.service';

describe('DepositsService', () => {
  let service: DepositsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
