import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesDetailComponent } from './recipies-detail.component';

describe('RecipiesDetailComponent', () => {
  let component: RecipiesDetailComponent;
  let fixture: ComponentFixture<RecipiesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipiesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
