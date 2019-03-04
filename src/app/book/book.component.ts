import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatPaginator, MatSort, MatSortable, MatTableDataSource} from '@angular/material';

import { Book } from '../../../models/Book';
import { BookInfoDialogComponent } from '../book-info-dialog/book-info-dialog.component';

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
        height: '90%',
        width: '600px',
        data: book
      });

      dialogRef.afterClosed().subscribe();
    });
  }
}