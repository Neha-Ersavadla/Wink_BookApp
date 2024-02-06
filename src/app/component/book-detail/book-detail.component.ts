import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';
  book: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.loadBookDetails();
    });
  }

  loadBookDetails(): void {
    this.bookService.getBookDetails(this.bookId).subscribe((data) => {
      this.book = data;
    });
  }

  // Sanitizes and marks the provided HTML content as safe for rendering in the application
  
  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
