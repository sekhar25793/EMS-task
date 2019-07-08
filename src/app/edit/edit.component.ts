import { Component, OnInit,ViewChild,Inject,Injectable } from '@angular/core';
import {IExpense} from '../Shared/clsExp';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private dailogRef:MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

  public getExpenses():IExpense[]{
    let localStorageItem=JSON.parse(localStorage.getItem('expenses'));
    
    return localStorageItem==null ?[]:localStorageItem;
  }

}
