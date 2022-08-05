import { TestBed } from '@angular/core/testing';

import { VotingGuard } from './vote.guard';

describe('VotingGuard', () => {
  let guard: VotingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VotingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
