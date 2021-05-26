import { TestBed } from '@angular/core/testing';

import { SetLanguageService } from './set-language.service';

describe('SetLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetLanguageService = TestBed.get(SetLanguageService);
    expect(service).toBeTruthy();
  });
});
