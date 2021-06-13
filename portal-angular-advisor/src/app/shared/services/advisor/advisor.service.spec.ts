import { TestBed } from '@angular/core/testing';

import { AdvisorService } from './advisor.service';

describe('AdvisorService', () => {
  let service: AdvisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
