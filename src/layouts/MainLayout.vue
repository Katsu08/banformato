<template>
  <q-layout view="lHh Lpr lFf">
    <header class="header">
      <h1 class="header__title">
        <span class="header__title--regular">Ban</span><span class="header__title--bold">Formato</span>
      </h1>
    </header>

    <div>
      <router-view />
    </div>
  </q-layout>
</template>

<style lang="scss">
  .header{
    @apply bg-primary-50 h-20 text-4xl text-primary-200 relative;

    &__title{
      @apply absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2;

      &--regular{
        @apply font-normal;
      }

      &--bold{
        @apply font-bold
      }
    }
  }
</style>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
