import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListItemComponent } from './comments-list-item.component';

describe('CommentsListItemComponent', () => {
  let component: CommentsListItemComponent;
  let fixture: ComponentFixture<CommentsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
