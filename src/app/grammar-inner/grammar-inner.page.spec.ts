import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrammarInnerPage } from './grammar-inner.page';

describe('GrammarInnerPage', () => {
  let component: GrammarInnerPage;
  let fixture: ComponentFixture<GrammarInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrammarInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
