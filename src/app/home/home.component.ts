import { Component, OnInit,ViewChild } from '@angular/core';
import {IExpense} from '../Shared/clsExp';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddExpenseComponent} from '../add-expense/add-expense.component';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  TotalBudget:number=0;TotalExpense:number=0;TotalBalance:number=0;
  expenseList:MatTableDataSource<IExpense>;
 // pageSizeOptions:any[];pageSize:any[];length:any[];
 @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
 @ViewChild(MatSort,{static:true}) sort:MatSort;

  displayedColumns: string[] = ['Edit','ExpId', 'Category', 'ItemName', 'Amount','ExpDate','Delete'];
  constructor(public dialog:MatDialog,private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.getExpenses();
    let expenses=this.getExpenses();
    let budget=this.getBudget();
    if(expenses.length==0){
      this.TotalBalance=0;
      this.TotalBudget=0;
      this.TotalExpense=0;
    }
    else{
      this.TotalBalance=0;
      this.TotalBudget=Number(budget);
      this.TotalExpense=0;
      expenses.forEach(element => {

        this.TotalExpense+=Number(element.Amount);
      });
      this.TotalBalance=Number(Number(budget)-Number(this.TotalExpense));
      this.expenseList.paginator=this.paginator;
      this.expenseList.sort=this.sort;
    }
  }

  deleteExp(expId:number){
    this.removeExpense(expId);
    this._snackBar.open('Expense Removed Successfully','Deleted', {
      duration: 5000
    });
  }

  openExpDailog(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '500px',
      height:'300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getExpenses();
      let expenses=this.getExpenses();
      let budget=this.getBudget();
      if(expenses.length==0){
        this.TotalBalance=0;
        this.TotalBudget=0;
        this.TotalExpense=0;
      }
      else{
        this.TotalBalance=0;
        this.TotalBudget=Number(budget);
        this.TotalExpense=0;
        expenses.forEach(element => {
          this.TotalExpense+=Number(element.Amount);
        });
    
        this.TotalBalance=Number(Number(budget)-Number(this.TotalExpense));
        this.expenseList.paginator=this.paginator;
        this.expenseList.sort=this.sort;
      }
    });
  }

  public getExpenses():IExpense[]{
   
    let localStorageItem=JSON.parse(localStorage.getItem('expenses'));
    this.expenseList=new MatTableDataSource(localStorageItem);
    
    return localStorageItem==null ?[]:localStorageItem;
  }

  public getBudget():IExpense[]{
   
    let localStorageItem=JSON.parse(localStorage.getItem('budget'));
    return localStorageItem==null ?[]:localStorageItem;
  }

  public getExpensesForRemove():IExpense[]{
    let localStorageItem=JSON.parse(localStorage.getItem('expenses'));
    return localStorageItem==null ?[]:localStorageItem;
  }

  public removeExpense(id:number):void{
    let expenses=this.getExpensesForRemove();
    expenses=expenses.filter((expense)=>expense.ExpId!=id);
    this.setLocalStorageExpenses(expenses);
    

    let expenseRemove=this.getExpenses();
    let budget=this.getBudget();
    if(expenseRemove.length==0){
      this.TotalBalance=0;
      this.TotalBudget=0;
      this.TotalExpense=0;
    }
    else{
      this.TotalBalance=0;
      this.TotalBudget=Number(budget);
      this.TotalExpense=0;
      expenseRemove.forEach(element => {
        this.TotalExpense+=Number(element.Amount);
      });
  
      this.TotalBalance=Number(Number(budget)-Number(this.TotalExpense));
      this.expenseList.paginator=this.paginator;
      this.expenseList.sort=this.sort;
    }
  }
  public setLocalStorageExpenses(expenses:IExpense[]):void{
    localStorage.setItem('expenses',JSON.stringify(expenses));
    this.getExpenses();
  }

  
 openExpDailogForEdit(element:any): void {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '500px',
      height:'300px',
      data: {ExpId:element.ExpId , ItemName: element.ItemName,Category:element.Category,Amount:element.Amount,
              ExpDate:element.ExpDate}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getExpenses();
      let expenses=this.getExpenses();
      let budget=this.getBudget();
      if(expenses.length==0){
        this.TotalBalance=0;
        this.TotalBudget=0;
        this.TotalExpense=0;
      }
      else{
        this.TotalBalance=0;
        this.TotalBudget=Number(budget);
        this.TotalExpense=0;
        expenses.forEach(element => {
          this.TotalExpense+=Number(element.Amount);
        });
    
        this.TotalBalance=Number(Number(budget)-Number(this.TotalExpense));
        this.expenseList.paginator=this.paginator;
        this.expenseList.sort=this.sort;
      }
    });

  }
 
}
