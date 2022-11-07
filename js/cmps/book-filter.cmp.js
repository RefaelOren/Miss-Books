export default {
    template: `
       <section class="book-filter">
           <input 
               @input="filter"
               v-model="filterBy.title"
               placeholder="Search..."
               type="text"
               class="text-filter" />
            <div class="price-filter">
                <label htmlFor="from-price">
                    From Price
                    <input 
                        id="from-price" 
                        @input="filter"
                        v-model.number="filterBy.fromPrice" 
                        type="number" 
                    />    
                </label>
                <label htmlFor="to-price">
                    To Price
                    <input  
                        id="to-price"
                        @input="filter" 
                        v-model.number="filterBy.toPrice" 
                        type="number" 
                     />   
                </label>
                </div>   
        </section>
    `,

    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: -Infinity,
                toPrice: Infinity,
            },
        };
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy);
        },
    },
};
