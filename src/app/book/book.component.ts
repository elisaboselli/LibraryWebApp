import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource} from '@angular/material';

import { Book } from '../../../models/Book';
import { BookInfoDialogComponent } from '../book-info-dialog/book-info-dialog.component';
import { BookEditDialogComponent} from '../book-edit-dialog/book-edit-dialog.component';
import { BookCreateDialogComponent } from  '../book-create-dialog/book-create-dialog.component';


@Component({
  selector: 'app-book',
  styleUrls: ['./book.component.css'],
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'publisher'];
  dataSource;
  books: Book[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.api.getBooks()
    .subscribe((books: Book[]) => {
      this.books = books;
      this.dataSource = new MatTableDataSource(books);
      this.dataSource.paginator = this.paginator;
      this.sort.sort(<MatSortable>({id: 'title', start: 'asc'}));
      this.dataSource.sort = this.sort;
    });
  }

  refresh() {
    this.api.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.dataSource.data = books;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openInfoDialog(id: string) {
    this.api.getBook(id).subscribe(book => { 
      console.log(book);
      let dialogRef = this.dialog.open(BookInfoDialogComponent, {
        width: '600px',
        data: book
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == 2) {
          this.openEditDialog(id);
        }

        if(result == 3) {
          this.api.deleteBook(id).subscribe(res => {}, (err) => { console.log(err); });
          this.refresh();
        }
      });
    });
  }

  openEditDialog(id: string) {
    let dialogRef = this.dialog.open(BookEditDialogComponent, {
      height: '90%',
      width: '1000px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.openInfoDialog(id);
    });
  }

  openCreateDialog(){
    let dialogRef = this.dialog.open(BookCreateDialogComponent, {
      height: '90%',
      width: '1000px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!= null){
        this.refresh();
        this.openInfoDialog(result);
      }
    });
  }
}