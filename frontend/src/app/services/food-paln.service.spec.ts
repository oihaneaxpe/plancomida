import { TestBed } from '@angular/core/testing';

import { FoodPalnService } from './food-paln.service';

describe('FoodPalnService', () => {
  let service: FoodPalnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodPalnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
