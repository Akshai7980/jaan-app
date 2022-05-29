import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FunCornerInnerPage } from './fun-corner-inner.page';

describe('FunCornerInnerPage', () => {
  let component: FunCornerInnerPage;
  let fixture: ComponentFixture<FunCornerInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunCornerInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FunCornerInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
