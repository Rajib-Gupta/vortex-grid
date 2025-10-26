import { TestBed } from '@angular/core/testing';

import { NgVortexgridService } from './ng-vortexgrid.service';

describe('NgVortexgridService', () => {
  let service: NgVortexgridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgVortexgridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
