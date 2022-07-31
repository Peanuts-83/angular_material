# Material Design How To

ref: [https://material.angular.io/](https://material.angular.io/)

## Setup this demo project

```bash
git clone <repo>
npm i
ng serve // watch on localhost:4200
```

## Setup a new project

```bash
ng new <projectName>   // angular project
cd <projectName>
ng add @angular/material   // add material lib >> choose theme & allow animations
```

Add material in app.module.ts and cd in shared/modules/, then create a new module dedicated to material design.

```bash
ng g m material
```

## Setup module

### Naming nomenclature

Module: Button

Import JS name: MatButtoModule (prefix: Mat, suffix: Module)

Use HTML name: mat-button / mat-raised-button / etc...
<br><br>

shared/modules/material.module.ts is used to set all used material modules to imports/exports. You import it in app.module.ts.

```javascript
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const MATERIALS = [MatButtonModule]

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS,
})
export class MaterialModule {}
```

In this example, Button module is used and can be set in HTML like so:

```html
<button mat-raised-button color="primary">Bouton</button>
```

## Icons

*material.module - import: MatIconModule*

Use any of the Google Font icons using \<mat-icon\> iconName \</mat-icon\>

```html
<button><mat-icon> dialpad </mat-icon> aaa</button>
```

## Input, Checkbox, Radio et SlideToggle

### mat-form-field

*app.module - import: ReactiveFormModule* <br>
*material.module - import: MatFormFieldModule*

Global wrapper for input form components.

Build a form object with FormBuilder, then refer to it in template with [FormGroup]="form".

```javascript
public form: FormGroup
constructor( private formBuilder: FormBuilder) {}

ngOnInit() {
  this.form = new formBuilder.group({
    input: ['default value', Validator.required],
    checked: ['', Validator.required]
  })
}
```

Get any referenced input value in HTML with the JSON pipe.

```html
<pre>{{ form.value | json }}</pre>
```

### Input

*material.module - import: MatInputModule*

Requires \<mat-form-field\> as wrapper.

formControlName links to the right ref in the formGroup.

Hint (mat-hint, hintLabel) to display text up or down input.

Error (mat-error) to display error text.
Accepts matPrefix & matSuffix (€, $, etc...)

```html
<form [FormGroup]="form" hintLabel="Max 20 characters">
  <mat-form-field>
    <mat-icon matPrefix>@</mat-icon>
    <input mat-input formControlName="input" type="email>
    <mat-hint align="end">mat-hint align=end</mat-hint>
    <mat-error *ngIf="form.invalid">Email invalid</mat-error>
  </mat-form-field>
</form>
```

### Checkbox

*material.module - import: MatCheckboxModule*

formControlName links to the right ref in the formGroup.

```html
<form [FormGroup]="form">
    <input mat-checkbox labelPosition="before" formControlName="checkbox">
</form>
```

### Radio button

*material.module - import: MatRadioModule*

formControlName links to the right ref in the formGroup.

```html
<form [FormGroup]="form">
  <mat-radio-group formControlName="radio">
    <mat-radio-button labelPosition="after" value="male">male</mat-radio-button>
    <mat-radio-button labelPosition="after" value="female">female</mat-radio-button>
  </mat-radio-group>
</form>
```

### Slide Toggle

*material.module - import: MatSlideToggleModule*

formControlName links to the right ref in the formGroup.

```html
<form [FormGroup]="form">
    <mat-slide-toggle color="primary" formControlName="toggle">male</mat-slide-toggle>
</form>
```

## Select, Slider & DatePicker

### Select

*material.module - import: MatSelectModule*

Requires \<mat-form-field\> as wrapper.
Takes \<mat-select\> and \<mat-option\>.

```html
<form [FormGroup]="form">
  <mat-form-field>
    <mat-select placeholder="Choose a totem" [(value)]="selectedAnimal" formControlName="select">
        <mat-option *ngFor="let animal of animals" [value]=animal>{{ animal }}</mat-option>
      </mat-select>
  </mat-form-field>
</form>
```

### Slider

*material.module - import: MatSliderModule*

```html
<form [FormGroup]="form">
  <mat-slider min="0" max="50" step="5" thumbLabel="true"  formControlName="slider" style="width: 100%; margin-bottom: -10px;"></mat-slider>
  <label>Quantity</label>
</form>
```

### Datepicker

*material.module - import: MatDatepickerModule* <br>
*material.module - import: MatNativeDateModule*

Requires \<mat-form-field\> as a wrapper. <br>
Takes \<matInput\>, \<mat-datepicker-toggle\> and \<mat-datepicker\>.
Accepts a lot of options, can set min & max dates, validators, internatinalisation ...

```html
<form [FormGroup]="form">
  <mat-form-field>
    <input
      matInput
      [matDatepicker]="picker"
      placeholder="Choose a date"
      [min]="new Date(2017, 0, 1)"
      [max]="new Date(2023, 0, 1)"
      formControlName="date"
      >
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
</form>
```

## Autocomplete

*material.module - import: MatAutocompleteModule*

Autocompletion can be enabled on **input components**. Pass \<mat-autocomplete\> component as a ref to \[matAutocomplete\] property.<br>
Options come with \<mat-option\> as with select component.

```javascript
// Class
public options = ['Bill', 'John', 'Jo']

// Template
<mat-form-field>
  <input matInput formControlName="input" [matAutocomplete]="auto">
  <mat-autocomplete #auto>
    <mat-option *ngFor="let option of options" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>
```

### Filtered autocomplete

Use an Observable to filter options[] with a pipe to return string[] as filteredOptions.<br>
Call filteredOptions with "| async" to enable subscription in the template.

```javascript
// Class
public filteredOptions : Observable<string[]>

ngOnInit() {
  this.filteredOptions = this.form
    .get('input')   // take the right control
    .valueChanges   // Observable - eventEmiter >> string
    .pipe(          // MUST return string[]
      startWith(''), // manage first click in input to display all options
      map((v: string) => this.options.filter(option => option.toLowerCase().includes(v.toLowerCase())))   // return string[]
    )
}

// Template
<mat-form-field>
  <input matInput formControlName="input" [matAutocomplete]="auto">
  <mat-autocomplete #auto>
    <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>
```

## Buttons, menu & sidenav

### Buttons

*material.module - import: MatButtonModule*

Different buttons called with mat-\<button\>/\<raised-button\>/\<flat-button\>/\<icon-button\>/\<fab-button\>/\<stroked-button\>.<br>
Takes optional color basic/primary/accent/warn.

```html
<button mat-button color="primary" title="base primary">Click me!</button>
<button mat-raised-button color="basic" title="raised basic">Click me!</button>
<button mat-flat-button color="accent" title="flat accent">Click me!</button>
<button mat-icon-button color="warn" title="icon warn">Click</button>
<button mat-mini-fab color="warn" title="mini-fab warn">Click</button>
<button mat-stroked-button color="warn" title="stroked warn">Click me!</button>
```

### Menu

*material.module - import: MatMenuModule*

Create menu buttons with sub-menu. Require a ref as a target on a \<mat-menu\> for the [matMenuTriggerFor] property. It should contain \<mat-menu-item\>.

```javascript
<button [matMenuTriggerFor]="menu" mat-raised-button color="primary">Menu button</button>
<mat-menu #menu>
  <button mat-menu-item style="width: 100%;">aaa</button>
  <button mat-menu-item style="width: 100%;">bbb</button>
  <button mat-menu-item style="width: 100%;">ccc</button>
</mat-menu>
```

### Sidenav

*material.module - import: MatSidenavModule*

Requires 3 components: \<mat-sidenav-container>, \<mat-sidenav-content> and \<mat-sidenav>.<br>
The first one contains the others, sidenav for the nav, sidenav-content for the corresponding part with data.

```javascript
// Class
public openNav: boolean = true

@HostListener('document:mousemove', ['$event])
public mousePosX(e) {
  if (e.clientX >= 1000) {
    this.openNav = true
  } else {
    this.openNav = false
  }
}

// Template
<mat-sidenav-container style="width: 100%; padding: 10px;">
  <mat-sidenav mode="over" position="end" [opened]="openNav" #nav>The sidenav</mat-sidenav>
  <mat-sidenav-content>
    content...
  </mat-sidenav-content>
</mat-sidenav-container>
```

## Card, Tabs & steppers

### Card & Tab

*material.module - import: MatCardModule*
*material.module - import: MatTabModule*

Card est constitutée de header (title, subtitle, matCardAvatar) et content (matCardImage, actions).
Tab permet de créer une navigation sympa qui peut-être lié au routing de l'app.

```javascript
<mat-card class="card">
  <mat-card-header title="mat-card-header">
    <mat-card-title title="mat-card-title">Margarita</mat-card-title>
    <mat-card-subtitle title="mat-card-subtitle">Sous le soleil de Mexico </mat-card-subtitle>
    <img matCardAvatar src="https://resize-elle.ladmedia.fr/r/300,388,center-middle,forcex,ffffff/img/var/plain_site/storage/images/elle-a-table/fiches-cuisine/tous-les-themes/recettes-de-cocktail/274055-9-fre-FR/Recettes-de-cocktail.jpg" title="matCardAvatar">
  </mat-card-header>
  <mat-card-content title="mat-card-content">
    <img matCardImage src="https://resize.elle.fr/portrait_320_webp/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/margarita-2037408/9397186-12-fre-FR/Margarita.jpg" title="matCardImage">
    <p>
      text... Servez.
    </p>
  </mat-card-content>
  <mat-card-actions align="end">
    <button mat-stroked-button color="primary" style="margin-right: 10px;"> Delete </button>
    <button mat-flat-button color="primary">Modify</button>
  </mat-card-actions>
</mat-card>
```

```javascript
  <mat-tab-group>
    <mat-tab label="tab1">tab 1</mat-tab>
    <mat-tab label="tab2">tab 2</mat-tab>
  </mat-tab-group>
```

### Stepper

*material.module - import: MatStepperModule*

Stepper permet de gérer des formulaires complexes, ou un système de commande de produits pour un site marchand. Préciser son état (vertical/horizontal).

```javascript
<mat-vertical-stepper style="margin: 0 50px;">
  <mat-step label="step1" state="step1">step1 content </mat-step>
  <mat-step label="step2" state="step2">step2 content </mat-step>
  <mat-step label="step3" state="step3">step3 content </mat-step>
  <mat-step label="step4" state="step4">step4 content </mat-step>
  <mat-step label="step5" state="step5">step5 content </mat-step>
</mat-vertical-stepper>
```

## Progress Bar & Spinner

*material.module - import: MatProgressBarModule*
*material.module - import: MatProgressSpinnerModule*

Takes 2 modes (determinate/indeterminate). Determinate takes values prop to binfd to % of loading data.

``` javascript
<mat-progress-bar mode="indeterminate"></mat-progress-bar>
  <mat-progress-spinner mode="determinate" [value]="loadingPercentage"></mat-progress-spinner>
```

See API online for all other components as Expansion panel, accordion, bouton toggle, chips etc...
[https://material.angular.io/](https://material.angular.io/)