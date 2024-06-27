import { TestBed } from '@angular/core/testing';

import { DailyHabitService } from './daily-habit.service';

describe('DailyHabitService', () => {
  let service: DailyHabitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyHabitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
