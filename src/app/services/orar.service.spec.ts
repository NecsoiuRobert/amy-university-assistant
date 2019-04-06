import { TestBed } from '@angular/core/testing';

import { OrarService } from './orar.service';

describe('OrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrarService = TestBed.get(OrarService);
    expect(service).toBeTruthy();
  });
});
