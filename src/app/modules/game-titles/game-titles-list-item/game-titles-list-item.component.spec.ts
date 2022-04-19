import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTitlesListItemComponent } from './game-titles-list-item.component';

describe('GameTitlesListItemComponent', () => {
  let component: GameTitlesListItemComponent;
  let fixture: ComponentFixture<GameTitlesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTitlesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitlesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
