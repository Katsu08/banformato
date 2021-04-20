<template>
  <div>
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
        <!-- Actions Buttons -->
        <q-icon :name="fasTimes" class="textArea__action textArea__action--close"></q-icon>
        <div class="textArea__action--bottomContainer">
          <span class="textArea__action--group">
            <q-icon :name="farHeart" class="textArea__action textArea__action--save"></q-icon>
            <q-icon :name="fasCopy" class="textArea__action textArea__action--copy"></q-icon>
          </span>
        </div>
      </div>
    </main>

    <footer class="footer font-footer">
      <div class="footer__text--container">Developed By: <span class="footer__link">Katsu</span></div>
    </footer>
  </div>
</template>


<script>
import { fasUniversity, fasUserTag, farHeart, fasCopy, fasTimes } from '@quasar/extras/fontawesome-v5'

export default {
  name: 'PageIndex',
  created(){
    this.fasUniversity = fasUniversity;
    this.fasUserTag = fasUserTag;
    this.farHeart = farHeart;
    this.fasCopy = fasCopy;
    this.fasTimes = fasTimes;
  }
}
</script>

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
    @apply bg-primary-50 relative pb-2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09);

    &__action{
      @apply text-primary-100 text-4xl;

      &--close{
        @apply absolute top-2 text-3xl right-6 text-semitransparent;  
      }

      &--bottomContainer{
        @apply grid grid-cols-12 bottom-2;
      }

      &--group{
        @apply col-start-10 col-end-12 col-span-4 grid grid-cols-2;
      }

      &--save{
        @apply mr-4 place-self-end;
      }
    }

    &__field{
      @apply w-full h-36 pr-14 pt-3 text-base text-left pl-4 bg-primary-50 resize-none text-primary-300;
    }

  }

  .footer{
    @apply absolute bottom-0 h-16 w-full bg-primary-50;

    &__text{
      &--container{
        @apply text-xl pl-3 absolute top-1/2 transform -translate-y-1/2;
      }
    }

    &__link{
      @apply text-primary-100;
    }
  }
</style>
