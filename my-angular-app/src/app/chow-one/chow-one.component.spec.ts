import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChowOneComponent } from './chow-one.component';

describe('ChowOneComponent', () => {
  let component: ChowOneComponent;
  let fixture: ComponentFixture<ChowOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChowOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChowOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
