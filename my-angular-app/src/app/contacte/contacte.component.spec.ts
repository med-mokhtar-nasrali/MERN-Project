import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacteComponent } from './contacte.component';

describe('ContacteComponent', () => {
  let component: ContacteComponent;
  let fixture: ComponentFixture<ContacteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContacteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
