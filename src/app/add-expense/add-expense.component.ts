import { Component, OnInit, Inject,Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IExpense} from '../Shared/clsExp';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  private nextId:number;
  ExpId:number;ItemName:string;Category:number;Amount:number;ExpDate:string;
  constructor(private _snackBar: MatSnackBar,private dailogRef:MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      
      if(data!=null){
        this.ExpId=data.ExpId;
        this.ItemName=data.ItemName;
        this.Category=data.Category;
        this.Amount=data.Amount;
        this.ExpDate=data.ExpDate;
      }

      let expenses=this.getExpenses();
      if(expenses.length==0){
        this.nextId=0;
      }
      else{
        let maxId=expenses[expenses.length-1].ExpId;
        this.nextId=maxId+1;
      }
     }

  ngOnInit() {
  }

 
  saveExpense(form:any):void{
    if(this.data!=null){
      this.editExpense(this.data.ExpId,form);
      this._snackBar.open('Expense Edited Successfully','Edit', {
        duration: 5000
      });
    }
    else{
    form.ExpId=this.nextId;
    let expenses=this.getExpenses();
    expenses.push(form);
    this.setLocalStorageExpenses(expenses);
    this.nextId++;
    this._snackBar.open('Expense Saved Successfully','Save', {
      duration: 5000
    });
    }
    
  }

  public getExpenses():IExpense[]{
    let localStorageItem=JSON.parse(localStorage.getItem('expenses'));
    return localStorageItem==null ?[]:localStorageItem;
  }

  public setLocalStorageExpenses(expenses:IExpense[]):void{
    localStorage.setItem('expenses',JSON.stringify(expenses));
  }

  public getExpensesForEdit():IExpense[]{
    let localStorageItem=JSON.parse(localStorage.getItem('expenses'));
    return localStorageItem==null ?[]:localStorageItem;
  }

  public editExpense(id:number,expData:any):void{
    let UpdExpense=[];
    let expenses=this.getExpensesForEdit();
    expenses=expenses.filter((expense)=>{
      if(expense.ExpId==id){
        expense.Category=expData.Category;
        expense.ItemName=expData.ItemName;
        expense.Amount=expData.Amount;
        expense.ExpDate=expData.ExpDate;

        UpdExpense.push(expense);
      }else{
        UpdExpense.push(expense);
      }
      localStorage.removeItem('expenses;')
      localStorage.setItem('expenses',JSON.stringify(UpdExpense));

    });
   
  }

  


}
