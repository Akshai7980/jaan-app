import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprehensionPage } from './comprehension.page';

describe('ComprehensionPage', () => {
  let component: ComprehensionPage;
  let fixture: ComponentFixture<ComprehensionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprehensionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
