import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaFavPage } from './receta-fav.page';

describe('RecetaFavPage', () => {
  let component: RecetaFavPage;
  let fixture: ComponentFixture<RecetaFavPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaFavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
