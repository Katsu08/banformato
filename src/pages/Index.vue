<template>
  <main>
    <div class="selecter">
      <div class="selecter__container">
        <q-icon class="selecter__icon selecter__icon--bank" :name="fasUniversity"/>
        <div class="selecter__name-selected">Bancaribe</div>
        <q-icon class="selecter__icon selecter__icon--userTag" :name="fasUserTag"/>
      </div>
    </div>

    <div class="textArea">
      <textarea name="translator" resizable='false' class="textArea__field"></textarea>
    </div>
  </main>
</template>

<style lang="scss">
  .selecter{
    @apply bg-primary-50;

    &__container{
      @apply grid content-center grid-cols-12 border-t h-14 border-b border-shadows-100 text-primary-200;
    }

    &__name-selected{
      @apply text-2xl leading-10 block col-span-8 align-middle;
    }

    &__icon{
      @apply text-4xl col-span-2 align-middle;

      &--bank{
        @apply ml-3;
      }

      &--userTag{
        @apply mr-3
      }
    }
  }

  .textArea{
    @apply bg-primary-50;

    &__field{
      @apply w-full h-48 bg-primary-50 resize-none
    }
  }
</style>

<script>
import { fasUniversity, fasUserTag } from '@quasar/extras/fontawesome-v5'

export default {
  name: 'PageIndex',
  created(){
    this.fasUniversity = fasUniversity
    this.fasUserTag = fasUserTag
  }
}
</script>
