import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatCardModule,MatDialogModule,MatSliderModule
  ,MatNativeDateModule,MatInputModule,MatGridListModule,MatSnackBarModule,MatPaginatorModule,MatSortModule} from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './Home/Home.component';
import { SettingsComponent } from './Settings/settings.component';
import { ProfileComponent } from './Profile/Profile.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import {MatTableModule} from '@angular/material/table';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditComponent } from './edit/edit.component';
import {FormControl, Validators} from '@angular/forms';






const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'Home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'Settings', component: SettingsComponent, data: { title: 'Settings' } },
  { path: 'Profile', component: ProfileComponent, data: { title: 'Profile' } }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,SettingsComponent,ProfileComponent,NavigationComponent, AddExpenseComponent, EditComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,MatCheckboxModule,
    CustomMaterialModule,
    MatTableModule,MatCardModule,MatDialogModule,
    MatSliderModule,MatNativeDateModule,MatInputModule,
    MatGridListModule,MatSnackBarModule,MatPaginatorModule,MatSortModule,
    
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddExpenseComponent],
})
export class AppModule { }


