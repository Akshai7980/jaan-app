import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamesInnerPage } from './games-inner.page';

describe('GamesInnerPage', () => {
  let component: GamesInnerPage;
  let fixture: ComponentFixture<GamesInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
