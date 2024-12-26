import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRecipesComponent } from './show-all-recipes.component';

describe('ShowAllRecipesComponent', () => {
  let component: ShowAllRecipesComponent;
  let fixture: ComponentFixture<ShowAllRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
