import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTitlesListComponent } from './game-titles-list.component';

describe('GameTitlesListComponent', () => {
  let component: GameTitlesListComponent;
  let fixture: ComponentFixture<GameTitlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTitlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
