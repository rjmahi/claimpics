import { TestBed } from '@angular/core/testing';

import { SubmitphotosService } from './submitphotos.service';

describe('SubmitphotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitphotosService = TestBed.get(SubmitphotosService);
    expect(service).toBeTruthy();
  });
});
