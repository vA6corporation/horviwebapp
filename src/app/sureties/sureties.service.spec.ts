import { TestBed } from '@angular/core/testing';

import { SuretiesService } from './sureties.service';

describe('SuretiesService', () => {
  let service: SuretiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuretiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
