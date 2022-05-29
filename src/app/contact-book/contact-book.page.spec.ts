import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactBookPage } from './contact-book.page';

describe('ContactBookPage', () => {
  let component: ContactBookPage;
  let fixture: ComponentFixture<ContactBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
