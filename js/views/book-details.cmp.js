import { bookService } from '../services/book-service.js';

import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
    template: `
        <section v-if="book" class="book-details">
            <router-link to="/books">
                <button class="close-btn">x</button>
            </router-link>
            <div class="section-center">
                <img :src="imgUrl" alt="" />
                <div class="details-content">
                    <h2>{{book.title}}</h2>
                    <h3>{{book.subtitle}}</h3>
                    <h4>{{book.authors[0]}}</h4>
                    <p :class="{red:isPriceHigh,green:isPriceLow}">{{book.listPrice.amount}}{{currency}}</p>
                    <p class="sale" v-if="book.listPrice.isOnSale">ON SALE!</p>
                    <h5>{{bookAge}}</h5>
                    <h5>{{pageCount}}</h5>
                    <long-text :book="book" :txt="book.description" :maxLength="50">
                </div>
                <review-add :book="book"/>
            </div>
        </section>
    `,
    data() {
        return {
            isPriceHigh: false,
            isPriceLow: false,
            book: null,
        };
    },

    created() {
        const id = +this.$route.params.id;
        bookService.get(id).then((book) => {
            this.book = book;
        });
    },

    mounted() {
        if (this.book) this.checkPrice();
    },

    unmounted() {
        this.isPriceHigh = false;
        this.isPriceHigh = false;
    },

    methods: {
        checkPrice() {
            if (this.book.listPrice.amount > 150) this.isPriceHigh = true;
            else if (this.book.listPrice.amount < 20) this.isPriceLow = true;
        },
    },

    computed: {
        imgUrl() {
            return `../../img/${this.book.id}.jpg`;
        },
        bookAge() {
            const diff = 2022 - this.book.publishedDate;
            if (diff > 10) return 'Veteran Book';
            if (diff <= 1) return 'New!';
        },
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading';
            else if (this.book.pageCount > 200) return 'Decent reading';
            else if (this.book.pageCount < 100) return 'Light reading';
        },
        currency() {
            const currency = this.book.listPrice.currencyCode;
            switch (currency) {
                case 'ILS':
                    return '₪';
                case 'USD':
                    return '$';
                case 'EUR':
                    return '€';
            }
        },
    },
    components: {
        longText,
        reviewAdd,
    },
};
