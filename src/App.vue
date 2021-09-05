<template>
    <div id="app">
        <div class="wrapper">
            <sidebar-menu v-if="shouldShowSidebar"></sidebar-menu>
            <header-menu v-if="shouldHeadbar"></header-menu>
            <router-view></router-view>
            <footer-menu v-if="shouldShowFooterbar"> </footer-menu>
            <control-sidebar></control-sidebar>
        </div>
    </div>
</template>

<script>
  import SidebarMenu from "@/Components/Sidebar.vue";
  import FooterMenu from "@/Components/Footer.vue";
  import HeaderMenu from "@/Components/Header.vue";
  import ControlSidebar from "@/Components/controlSidebar.vue";
export default {
  name: 'App',
  components: {
    SidebarMenu,
    FooterMenu,
    HeaderMenu, ControlSidebar
  },

    watch: {
        didAutoLogout(curValue){
            if(curValue){
                this.$router.replace('/login');
               window.location.refresh();
            }
        }
    },

    computed: {
    shouldShowSidebar(){
      return this.$route.meta.sidebar!==false;
    },
      shouldHeadbar(){
          return this.$route.meta.header!==false;
      },
      shouldShowFooterbar() {
          return this.$route.meta.footerBar !== false;
      },

      auth(){
          return this.$route.meta.requireAuth!==false;
      },

      didAutoLogout(){
          return this.$store.getters.didAutoLogout;
      }
  },

  methods:{
      autoLogin(){
          this.$store.dispatch('autoLogin');
      }
  },

    mounted() {
      this.autoLogin()
    }
}
</script>

<style>
.error-span{
    color: red;
    margin-bottom: 10px;
}

</style>
