import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchivementsPageComponent } from '../components/achivements-page.component';

describe('AchivementsPageComponent', () => {
  let component: AchivementsPageComponent;
  let fixture: ComponentFixture<AchivementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchivementsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AchivementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
