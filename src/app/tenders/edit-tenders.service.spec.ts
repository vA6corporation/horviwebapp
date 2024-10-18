import { TestBed } from '@angular/core/testing';

import { EditTendersService } from './edit-tenders.service';

describe('EditTendersService', () => {
  let service: EditTendersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTendersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
