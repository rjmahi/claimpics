import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeaphotoComponent } from './takeaphoto.component';

describe('TakeaphotoComponent', () => {
  let component: TakeaphotoComponent;
  let fixture: ComponentFixture<TakeaphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeaphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeaphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
