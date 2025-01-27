import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSummaryComponent } from './new-summary.component';

describe('NewSummaryComponent', () => {
  let component: NewSummaryComponent;
  let fixture: ComponentFixture<NewSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
