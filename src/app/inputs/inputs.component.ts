import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { map, Observable, startWith } from 'rxjs'

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  public form: FormGroup

  // autocomplete for input
  public options: string[] = ['Raymond', 'Georges', 'Tatiana']
  public filteredOptions: Observable<string[]>

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [''],
      input2: [''],
      input3: ['', [Validators.email]],
      checkbox: [''],
      radio: [''],
      toggle: ['', [Validators.required]],
    })

    this.filteredOptions = this.form
      .get('input')
      .valueChanges   // Observable / eventEmiter
      .pipe(
        startWith(''),    // Emit at subscribe to set '' to get all options
        map((value: string) =>
          this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()))
        )
        )

  }
}
