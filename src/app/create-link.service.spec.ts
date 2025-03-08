import { TestBed } from '@angular/core/testing';

import { CreateLinkService } from './create-link.service';

describe('CreateLinkService', () => {
  let service: CreateLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
