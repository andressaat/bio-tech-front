import { TestBed } from '@angular/core/testing';

import { DietaNutricionalService } from './dieta-nutricional.service';

describe('DietaNutricionalService', () => {
  let service: DietaNutricionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietaNutricionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
