import { TestBed } from '@angular/core/testing';

import { DeletionService } from './deletion.service';

describe('DeletionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletionService = TestBed.get(DeletionService);
    expect(service).toBeTruthy();
  });
});
