import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlarmInnerPage } from './alarm-inner.page';

describe('AlarmInnerPage', () => {
  let component: AlarmInnerPage;
  let fixture: ComponentFixture<AlarmInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
