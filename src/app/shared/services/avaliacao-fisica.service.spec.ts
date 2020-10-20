import { TestBed } from '@angular/core/testing';

import { AvaliacaoFisicaService } from './avaliacao-fisica.service';

describe('AvaliacaoFisicaService', () => {
  let service: AvaliacaoFisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoFisicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
