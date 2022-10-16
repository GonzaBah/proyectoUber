import { TestBed } from '@angular/core/testing';

import { CamaraApiService } from './camara-api.service';

describe('CamaraApiService', () => {
  let service: CamaraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
