import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookComponent } from './book/book.component';
import { BookCreateDialogComponent } from './book-create-dialog/book-create-dialog.component';
import { BookInfoDialogComponent } from './book-info-dialog/book-info-dialog.component';
import { BookEditDialogComponent } from './book-edit-dialog/book-edit-dialog.component';

import {
  MatButtonModule,
  MatCheckboxModule, 
  MatDatepickerModule, 
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule } from "@angular/material";

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookCreateDialogComponent,
    BookInfoDialogComponent,
    BookEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatDatepickerModule, 
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  entryComponents: [
    BookInfoDialogComponent, 
    BookEditDialogComponent,
    BookCreateDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
