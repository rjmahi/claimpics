import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopalertComponent } from './desktopalert.component';

describe('DesktopalertComponent', () => {
  let component: DesktopalertComponent;
  let fixture: ComponentFixture<DesktopalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
