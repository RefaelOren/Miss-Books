import { bookService } from '../services/book.service.js';

import bookFilter from './book-filter.cmp.js';
import bookList from './book-list.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter" />
        <book-list :books = "booksToShow" @selected="selectBook" />
        <book-details @close="selectedBook = null"
                      v-if="selectedBook"
                      :book="selectedBook"        
        />

    </section>

    `,
    data() {
        return {
            books: bookService.query(),
            selectedBook: null,
            filterBy: {},
        };
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        filter(filterBy) {
            this.filterBy = filterBy;
        },
    },

    computed: {
        booksToShow() {
            const regex = new RegExp(this.filterBy.title, 'i');
            if (
                !this.filterBy.fromPrice &&
                !this.filterBy.toPrice &&
                !this.filterBy.title
            )
                return this.books;
            return this.books.filter(
                (book) =>
                    regex.test(book.title) &&
                    book.listPrice.amount > this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice
            );
        },
    },

    created() {},
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
};
