<template>
    <div 
        class="bank-list"
        :style="`min-height: ${windowHeight - navbarOffsetHeight}px`"
        v-if="show"
    >
        <div class="bank-list__container">
            <div class="bank-list__header">
                <q-icon 
                    @click="$emit('close')"
                    class="bank-list__icon bank-list__icon--bank" 
                    :name="fasUniversity"
                    />
                <div class="bank-list__searchbar-container">
                    <input
                        placeholder="Búsqueda"
                        class="bank-list__searchbar"
                        v-model="search"
                    />
                </div>
                <q-icon class="bank-list__icon bank-list__icon--search" :name="fasSearch"/>
            </div>

            <div class="bank-list__body">
                <div 
                    @click="$emit('select', bank)"
                    v-for="bank in searchResult" 
                    :key="bank.id"
                    class="bank-list__item" 
                >
                    <q-avatar 
                        class="bank-list__item--avatar"
                    >
                        <img :src="bank.img" alt="">
                    </q-avatar>
                    <h3 
                        class="bank-list__item--nombre"
                    >
                        {{bank.name}}
                    </h3>
                </div>
            </div>
        </div>
    </div> 
</template>

<style lang="scss">
    .bank-list{
        @apply bg-primary-50 relative text-primary-200;

        &__header{
            @apply grid content-center grid-cols-12 border-t h-14 border-b border-shadows-100 text-primary-200;
        }

        &__searchbar-container{
            @apply col-span-8 flex place-content-center justify-center place-content-center align-middle max-h-10;
        }

        &__searchbar{
           @apply text-xl border border-primary-200 rounded-md py-1 align-middle w-11/12;
        }

        &__icon{
            @apply text-4xl col-span-2 align-middle;

            &--bank{
                @apply self-center place-self-start ml-3;
            }

            &--search{
                @apply self-center place-self-end mr-3;
            }
        }

        &__item{
            @apply border-b grid grid-cols-12 border-shadows-100 py-px;

            &--avatar{
                @apply col-start-2 col-span-2 place-self-start self-center;
            }

            &--nombre{
                @apply text-2xl self-center;
            }
        }
    }
</style>

<script>
import { fasSearch, fasUniversity } from 'app/node_modules/@quasar/extras/fontawesome-v5';
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
        this.fasUniversity = fasUniversity;
        this.fasSearch = fasSearch;
    },
    computed:{
        ...mapState({
            banks: state => state.banks
        }),

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
