import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Book } from '../../../models/Book';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.css']
})
export class BookEditDialogComponent implements OnInit {

  editBookForm: FormGroup;
  id:string = '';
  isbn:string = '';
  title:string = '';
  author:string = '';
  publisher:string = '';
  synopsis:string = '';
  autoconclusive:boolean = false;
  tome:string = '';
  purchase_date:Date;

  constructor(public dialogRef: MatDialogRef<BookEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, private api: ApiService) { }

  ngOnInit() {
    this.getBook(this.data);
    this.editBookForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      synopsis: new FormControl('', [Validators.required]),
      autoconclusive: new FormControl('',[Validators.required]),
      tome: new FormControl('',null),
      purchase_date: new FormControl(new Date()),
    });
  }

  getBook(id: string) {
    this.api.getBook(id).subscribe(data => {
      this.id = data._id;
      this.editBookForm.setValue({
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        synopsis: data.synopsis,
        autoconclusive: data.autoconclusive,
        tome: data.tome,
        purchase_date: data.purchase_date
      });
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.editBookForm.controls[controlName].hasError(errorName);
  }

  onFormSubmit(form:NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.dialogRef.close();
        }, (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    console.log("close");
    this.dialogRef.close();
  }
}