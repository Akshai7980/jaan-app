import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrammarPage } from './grammar.page';

describe('GrammarPage', () => {
  let component: GrammarPage;
  let fixture: ComponentFixture<GrammarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrammarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
