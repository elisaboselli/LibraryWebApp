import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { Book } from '../../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book-info-dialog.component.html',
  styleUrls: ['./book-info-dialog.component.css']
})
export class BookInfoDialogComponent implements OnInit {
  constructor(public thisDialogRef: MatDialogRef<BookInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  dialogBook: Book;
  dialog: any;

  ngOnInit() {}

  onOk() {
    this.thisDialogRef.close(1);
  }

  onEdit() {
    this.thisDialogRef.close(2);
  }

  onDelete(): void {
    this.thisDialogRef.close(3);
  }
}