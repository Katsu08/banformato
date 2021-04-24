<template>
    <div 
        class=""
        :style="`min-height: ${windowHeight - navbarOffsetHeight}px`"
        v-if="show"
    >
        <div>
            
        </div>
    </div> 
</template>

<style lang="scss">
    searchbar{
        @apply text-xl border border-primary-200 rounded-md py-1 align-middle w-11/12;
    }
</style>

<script>
import { fasSearch, fasTimes, farUserCircle, farUser } from 'app/node_modules/@quasar/extras/fontawesome-v5';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('banks');

export default {
    data(){
        return {
            navbarOffsetHeight: 0,
            windowHeight: 0,
            search: ''
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    created(){
        this.fasTimes = fasTimes;
        this.farUserCircle = farUserCircle;
        this.fasSearch = fasSearch;
    },
    computed:{
        searchResult(){
            if(this.search.length > 0){
                let expression = new RegExp(this.search, 'i');

                let result = this.banks.filter(bank => {
                    if(bank.name.search(expression) !== -1){
                        return true
                    } else{
                        return false
                    }
                });

                return result;
            } else{
                return this.banks;
            }
        }
    },
    methods:{
        onResize() {
            this.windowHeight = window.innerHeight;
           this.navbarOffsetHeight = document.getElementsByClassName('header')[0].offsetHeight;
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            this.onResize();
        })
    },
}
</script>
