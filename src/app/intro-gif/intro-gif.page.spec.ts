import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroGifPage } from './intro-gif.page';

describe('IntroGifPage', () => {
  let component: IntroGifPage;
  let fixture: ComponentFixture<IntroGifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroGifPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroGifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
