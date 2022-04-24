import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTitleDetailsComponent } from './game-title-details.component';

describe('GameTitleDetailsComponent', () => {
  let component: GameTitleDetailsComponent;
  let fixture: ComponentFixture<GameTitleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTitleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
