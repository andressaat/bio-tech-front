import { TestBed } from '@angular/core/testing';

import { PacotesService } from './pacotes.service';

describe('PacotesService', () => {
  let service: PacotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
