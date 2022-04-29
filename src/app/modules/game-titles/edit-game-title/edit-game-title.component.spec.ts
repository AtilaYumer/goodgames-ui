import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameTitleComponent } from './edit-game-title.component';

describe('EditGameTitleComponent', () => {
  let component: EditGameTitleComponent;
  let fixture: ComponentFixture<EditGameTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGameTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGameTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
