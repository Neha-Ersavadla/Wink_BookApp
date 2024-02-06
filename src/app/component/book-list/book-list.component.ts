// book-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: `./book-list.component.html`,
  styleUrls: [`./book-list.component.css`],
})
export class BookListComponent implements OnInit {
  searchQuery: string = '';
  books: any[] = [];
  pageSizeOptions: number[] = [5, 10, 15, 20]; // number of elements to be shown
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Set the default query to "book" when fetching all books on component initialization
    this.fetchAllBooks('book');
  }

  onSearchChange(): void {
    // Trigger searchBooks whenever the searchQuery changes
    this.searchBooks();
  }

  fetchAllBooks(query: string): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    this.bookService
      .searchBooks(query, this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.books = data.items || [];

        if (query && query !== this.searchQuery) {
          this.totalItems = data.totalItems || 0;
        }
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }

  searchBooks(): void {
    this.fetchAllBooks(this.searchQuery);
  }

  onPageOrPageSizeChange(event: any): void {
   

    if (event.pageIndex !== undefined) {
      // If pageIndex is defined, it's a page change event
      this.currentPage = event.pageIndex + 1;
    }

    if (event.pageSize !== undefined) {
      // If pageSize is defined, it's a pageSize change event
      const newPageSize: number = event.pageSize;
      this.pageSize = newPageSize;
      this.currentPage = 1; // Reset to the first page when changing page size
    }

    const defaultQuery: string = this.searchQuery ? this.searchQuery : 'book';
    this.fetchAllBooks(defaultQuery); // Fetch books for the new page or page size
  }

  truncateDescription(description: string): string {
    if (description) {
      const lines = description.split('\n');
      if (lines.length > 2) {
        return lines.slice(0, 2).join('\n') + '...';
      }
      return description;
    } else {
      return ''; // Return an empty string or another default value if description is undefined
    }
  }

  navigateToDetail(bookId: string): void {
    window.open(`/books/${bookId}`, '_blank');
  }
}
