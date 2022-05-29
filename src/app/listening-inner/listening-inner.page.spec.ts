import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeningInnerPage } from './listening-inner.page';

describe('ListeningInnerPage', () => {
  let component: ListeningInnerPage;
  let fixture: ComponentFixture<ListeningInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
