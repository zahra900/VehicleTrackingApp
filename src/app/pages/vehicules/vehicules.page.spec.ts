import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehiculesPage } from './vehicules.page';

describe('VehiculesPage', () => {
  let component: VehiculesPage;
  let fixture: ComponentFixture<VehiculesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
