import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor() {}

  onLoad(e) {
    console.log('event', e);
  }

  markdown = `
  # Material Design How To

ref: [https://material.angular.io/](https://material.angular.io/)

## Setup this demo project

\`\`\`bash
git clone <repo>
npm i
ng serve // watch on localhost:4200
\`\`\`

## Setup a new project
  `


}
