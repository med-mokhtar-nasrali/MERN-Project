import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrComponent } from './err.component';

describe('ErrComponent', () => {
  let component: ErrComponent;
  let fixture: ComponentFixture<ErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
