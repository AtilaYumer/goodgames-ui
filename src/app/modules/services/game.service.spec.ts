import { TestBed } from '@angular/core/testing';

import { GameTitleService } from './game.service';

describe('GameService', () => {
  let service: GameTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
