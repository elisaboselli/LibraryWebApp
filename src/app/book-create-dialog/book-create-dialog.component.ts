import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create-dialog',
  templateUrl: './book-create-dialog.component.html',
  styleUrls: ['./book-create-dialog.component.css']
})

export class BookCreateDialogComponent implements OnInit {

  createBookForm: FormGroup;
  isbn:string = '';
  title:string = '';
  author:string = '';
  publisher:string = '';
  synopsis:string = '';
  autoconclusive:boolean = false;
  tome:string = '';
  purchase_date:Date;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,public dialogRef: MatDialogRef<BookCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.createBookForm = new FormGroup({
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

   public hasError = (controlName: string, errorName: string) =>{
    return this.createBookForm.controls[controlName].hasError(errorName);
  }

  onFormSubmit(form:NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
          let id = res['_id'];
          this.dialogRef.close(id);
        }, (err) => {
          console.log(err);
        });
  }

  onCancel() {
    this.dialogRef.close(null);
  }

}
