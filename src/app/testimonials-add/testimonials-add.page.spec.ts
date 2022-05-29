import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestimonialsAddPage } from './testimonials-add.page';

describe('TestimonialsAddPage', () => {
  let component: TestimonialsAddPage;
  let fixture: ComponentFixture<TestimonialsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
