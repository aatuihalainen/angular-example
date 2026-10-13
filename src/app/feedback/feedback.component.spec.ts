import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback.component';
import { routes } from '../app.routes';
import { provideRouter, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
//import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        provideRouter([{path: 'home', component: HomeComponent}]),
      ],
      imports: [FeedbackComponent, BrowserAnimationsModule],
      /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]*/
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
    h1 = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Testaa, että feedback komponentin "cancel" nappi palauttaa etusivulle
  it('should navigate to "home" when cancel is clicked', () => {
    component.cancel();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  //Testaa, että feedback componentin h1 otsikko sisältää tekstin "Give feedback"
  it('should have correct title', () => {
    expect(h1.textContent).toContain("Give feedback");
  });
});
