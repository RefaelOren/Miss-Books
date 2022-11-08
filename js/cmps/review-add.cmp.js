import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus.service.js';

import bookReviews from './book-reviews.cmp.js';

export default {
    props: ['book'],
    template: `
        <section class="review-add">
            <form @submit.prevent="save">         
                <h1>review book</h1>
                <input 
                    v-model="review.name" 
                    ref="name" 
                    type="text" 
                    placeholder="Full Name" />
                <label htmlFor="rate">
                    Rate
                    <select v-model="review.rate" id="rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <input  v-model="review.date" type="date" />
                <textarea 
                    v-model="review.freeTxt" 
                    cols="30" rows="10" 
                    placeholder="Did you liked this book?...">
                </textarea>
                <button>Save Review</button>
            </form>
            <div v-if="updatedBook" className="reviews">             
                <ul>
                    <li v-for="review in updatedBook.reviews" 
                        :key="book.id"
                        
                        >
                       <book-reviews :review="review"  @remove="deleteReview"/>
                    </li>
                </ul>
            </div>
            <div v-else className="reviews">
                <ul>
                    <li v-for="review in book.reviews" :key="book.id">
                        <book-reviews :review="review" @remove="deleteReview" />

                    </li>
                </ul>
            </div>

        </section>
    `,

    data() {
        return {
            review: {
                id: '',
                name: '',
                rate: 1,
                date: '',
                freeTxt: '',
            },
            updatedBook: null,
        };
    },

    mounted() {
        this.$refs.name.focus();
    },

    methods: {
        save() {
            console.log(this.book.id, this.review);
            bookService
                .addReview(this.book.id, { ...this.review })
                .then((updatedBook) => {
                    this.updatedBook = updatedBook;
                    const msg = {
                        txt: `Review for ${updatedBook.title} saved`,
                        type: 'success',
                        timeout: 3000,
                    };
                    eventBus.emit('user-msg', msg);
                });
            this.review.name = '';
            this.review.rate = 1;
            this.review.date = '';
            this.review.freeTxt = '';
            this.$refs.name.focus();
        },
        deleteReview(reviewId) {
            console.log('delete');
            bookService
                .removeReview(this.book.id, reviewId)
                .then((updatedBook) => {
                    this.updatedBook = updatedBook;
                    const msg = {
                        txt: `Review for ${updatedBook.title} deleted`,
                        type: 'success',
                        timeout: 3000,
                    };
                    eventBus.emit('user-msg', msg);
                });
        },
    },

    computed: {},
    components: {
        bookReviews,
    },
};
