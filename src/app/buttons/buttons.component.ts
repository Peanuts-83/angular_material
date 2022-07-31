import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  public openNav = true

  @HostListener('document:mousemove', ['$event'])
  public mousePosX(e) {
    if (e.clientX >= 1000) {
      this.openNav = true
    } else {
      this.openNav = false
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
