import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VocabularyInnerPage } from './vocabulary-inner.page';

describe('VocabularyInnerPage', () => {
  let component: VocabularyInnerPage;
  let fixture: ComponentFixture<VocabularyInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
