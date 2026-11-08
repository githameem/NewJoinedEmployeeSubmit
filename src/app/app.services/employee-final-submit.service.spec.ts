import { TestBed } from '@angular/core/testing';

import { EmployeeFinalSubmitService } from './employee-final-submit.service';

describe('EmployeeFinalSubmitService', () => {
  let service: EmployeeFinalSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFinalSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
