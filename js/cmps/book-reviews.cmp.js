export default {
    props: ['review'],
    template: `
                    <section class="book-reviews">
                        <h4>{{review.name}}</h4>
                        <h3>{{rating(review.rate)}}</h3>
                        <h4>{{review.date}}</h4>
                        <p>{{review.freeTxt}}</p>
                        <button @click="remove(review.id)">x</button>
                    </section>
        
    `,
    methods: {
        rating(rate) {
            let rating = '';
            for (let i = 0; i < rate; i++) {
                rating += '⭐';
            }
            return rating;
        },
        remove(reviewId) {
            console.log('delete', reviewId);
            this.$emit('remove', reviewId);
        },
    },
};
