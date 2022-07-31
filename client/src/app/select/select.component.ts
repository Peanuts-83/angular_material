import { FormGroup, FormBuilder } from '@angular/forms'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  public form: FormGroup
  public animals: string[] = ['horse', 'dog', 'cat', 'elephant']
  public selectedAnimal: string
  public icons = {
    horse: '🐎',
    dog: '🐕 ',
    cat: '🐈 ',
    elephant: '🐘 '
  }

  public picker: any
  public minDate: Date = new Date(2020, 0, 1)
  public maxDate: Date = new Date(2022, 0, 1)

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      select: [''],
      slider: [''],
      date: [''],
    })
  }

}
