import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeAspectsPage } from './home-aspects.page';

describe('HomeAspectsPage', () => {
  let component: HomeAspectsPage;
  let fixture: ComponentFixture<HomeAspectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAspectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAspectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
