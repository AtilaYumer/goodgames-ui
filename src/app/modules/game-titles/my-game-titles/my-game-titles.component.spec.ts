import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGameTitlesComponent } from './my-game-titles.component';

describe('MyGameTitlesComponent', () => {
  let component: MyGameTitlesComponent;
  let fixture: ComponentFixture<MyGameTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGameTitlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
