import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestimonialsInnerPage } from './testimonials-inner.page';

describe('TestimonialsInnerPage', () => {
  let component: TestimonialsInnerPage;
  let fixture: ComponentFixture<TestimonialsInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
