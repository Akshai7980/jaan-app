import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DictionaryInnerPage } from './dictionary-inner.page';

describe('DictionaryInnerPage', () => {
  let component: DictionaryInnerPage;
  let fixture: ComponentFixture<DictionaryInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
