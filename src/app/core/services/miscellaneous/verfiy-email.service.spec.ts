import { TestBed } from '@angular/core/testing';

import { VerfiyEmailService } from './verfiy-email.service';

describe('VerfiyEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerfiyEmailService = TestBed.get(VerfiyEmailService);
    expect(service).toBeTruthy();
  });
});
