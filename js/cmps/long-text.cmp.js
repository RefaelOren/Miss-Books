export default {
    props: ['txt', 'maxLength'],
    template: `
       <section class="long-text">
           <p v-if="isShort">{{shortTxt}}...<span @click="isShort=!isShort">More</span></p>
           <p v-else>{{txt}} <span @click="isShort=!isShort">Less</span></p>
       </section>
    `,

    data() {
        return {
            isShort: true,
        };
    },

    computed: {
        shortTxt() {
            return this.txt.substring(0, this.maxLength);
        },
    },
};
