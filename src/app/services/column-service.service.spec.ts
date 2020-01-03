import { TestBed } from '@angular/core/testing';

import { ColumnServiceService } from './column-service.service';

describe('ColumnServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColumnServiceService = TestBed.get(ColumnServiceService);
    expect(service).toBeTruthy();
  });
});
