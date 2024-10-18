import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessModel } from '../business.model';

@Component({
  selector: 'app-dialog-birthday',
  templateUrl: './dialog-birthday.component.html',
  styleUrls: ['./dialog-birthday.component.sass']
})
export class DialogBirthdayComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly businesses: BusinessModel[]
  ) { }

  ngOnInit(): void {
    
  }

}
