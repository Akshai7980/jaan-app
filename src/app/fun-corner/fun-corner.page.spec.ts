import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FunCornerPage } from './fun-corner.page';

describe('FunCornerPage', () => {
  let component: FunCornerPage;
  let fixture: ComponentFixture<FunCornerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunCornerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FunCornerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
