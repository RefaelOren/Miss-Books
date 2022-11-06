import longText from './long-text.cmp.js';

export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <button @click="$emit('close')">x</button>
           <div class="section-center">

               <img :src="imgUrl" alt="" />
               <h2>{{book.title}}</h2>
               <h3>{{book.subtitle}}</h3>
               <h4 v-for="author in authors">
                    {{book.author}}
               </h4>
               <h5>{{bookAge}}</h5>
               <h5>{{pageCount}}</h5>
               <p :class="{red:isPriceHigh,green:isPriceLow}">{{book.listPrice.amount}}{{currency}}</p>
               <p v-if="book.listPrice.isOnSale">ON SALE!</p>
               <long-text :txt="book.description">

           </div>
        </section>
    `,
    data() {
        return {
            isPriceHigh: false,
            isPriceLow: false,
        };
    },

    created() {
        this.checkPrice();
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
    },
};
