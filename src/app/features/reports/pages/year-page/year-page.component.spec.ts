import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearPageComponent } from './year-page.component';

describe('YearPageComponent', () => {
  let component: YearPageComponent;
  let fixture: ComponentFixture<YearPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
