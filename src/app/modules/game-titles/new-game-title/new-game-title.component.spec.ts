import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameTitleComponent } from './new-game-title.component';

describe('NewGameTitleComponent', () => {
  let component: NewGameTitleComponent;
  let fixture: ComponentFixture<NewGameTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGameTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
