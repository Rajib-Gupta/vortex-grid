import { TestBed } from '@angular/core/testing';

import { VortexgridService } from './vortexgrid.service';

describe('VortexgridService', () => {
  let service: VortexgridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VortexgridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
