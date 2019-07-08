import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  SaveBudget(form:any){
    localStorage.removeItem('budget');
    localStorage.setItem('budget',JSON.stringify(form.TotalBudget));
    this._snackBar.open('Budget Updated Successfully','Update', {
      duration: 5000
    });
  }
}
