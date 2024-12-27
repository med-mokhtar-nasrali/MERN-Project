import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneRecipeComponent } from './view-one-recipe.component';

describe('ViewOneRecipeComponent', () => {
  let component: ViewOneRecipeComponent;
  let fixture: ComponentFixture<ViewOneRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
