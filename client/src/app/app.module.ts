import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { MaterialModule } from './shared/modules/material.module'

import { AppComponent } from './app.component'
import { InputsComponent } from './inputs/inputs.component'
import { SelectComponent } from './select/select.component'
import { ButtonsComponent } from './buttons/buttons.component'
import { CardComponent } from './card/card.component'
import { ProgressComponent } from './progress/progress.component'

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    SelectComponent,
    ButtonsComponent,
    CardComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
