export default {
    props: ['book'],
    template: `
      <section class="book-review">
        <img  :src="imgUrl"
              :title="'Click for details'"/>
               
        <div class="book-review-details">
            <h4>{{book.title}}</h4>
            <p>{{book.listPrice.amount}}{{currency}}</p>
        </div>
      </section>
    `,
    computed: {
        imgUrl() {
            return `../../img/${this.book.id}.jpg`;
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
};
