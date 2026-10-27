import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback.component';
import { provideRouter, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AbstractControl, FormControl } from '@angular/forms';
//import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let h1: HTMLElement;
  let sButton: HTMLButtonElement;

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
    sButton = fixture.nativeElement.querySelector('#submit-button');
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

  //Testaa, että lomakkeen kaikki kentät ovat aluksi tyhjiä
  it('should have empty feedback fields when the page is loaded', () => {
    expect(component.fbForm.get('title')?.value).toBe('');
    expect(component.fbForm.get('description')?.value).toBe('');
    expect(component.fbForm.get('name')?.value).toBe('');
    expect(component.fbForm.get('email')?.value).toBe('');
    expect(component.fbForm.get('phone')?.value).toBe('');
  });

  //Testaa, että submit nappi on disabloitu kun formi ei ole valid
  it('should disable the submit button when form is invalid', () => {
    expect(component.fbForm.invalid).toBeTruthy();
    expect(sButton.disabled).toBeTruthy();
  });

  //Testaa, että kaikki 6 kenttää latautuvat (5 tekstikenttää ja 1 checkbox)
  it('should display all six form fields', () => {
    let inputs = fixture.nativeElement.querySelectorAll('input, mat-checkbox');
    expect(inputs.length).toBe(6);
  });
});
