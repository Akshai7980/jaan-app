import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprehensionInnerPage } from './comprehension-inner.page';

describe('ComprehensionInnerPage', () => {
  let component: ComprehensionInnerPage;
  let fixture: ComponentFixture<ComprehensionInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensionInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprehensionInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
