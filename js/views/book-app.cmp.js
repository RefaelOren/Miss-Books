import { bookService } from '../services/book-service.js';

import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
// import bookDetails from '../cmps/book-details.cmp.js';

export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter" />
        <book-list v-if="books" 
                  :books = "booksToShow" 
                  @selected="selectBook"
                   />
       
        
    </section>

    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        };
    },

    created() {
        this.books = bookService.query().then((books) => (this.books = books));
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

    components: {
        bookList,
        // bookDetails,
        bookFilter,
    },
};
