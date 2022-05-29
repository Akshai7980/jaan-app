import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderMorePage } from './header-more.page';

describe('HeaderMorePage', () => {
  let component: HeaderMorePage;
  let fixture: ComponentFixture<HeaderMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
