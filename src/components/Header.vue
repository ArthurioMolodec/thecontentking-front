<template>
  {{ $route.moduleName }} 123
  <v-app-bar dense flat color="#242424" app>
    <div @click="drawer = !drawer" class="mobile-btn text-white">
      <img src="../assets/icons/menu.svg">
    </div>
    <v-spacer class="spacer-second"></v-spacer>
    <router-link to="/" class="logo-container">
      <img src="../assets/logo-small.svg" class="logo"> {{ TITLE }}
    </router-link>
    <v-spacer class="spacer-first"></v-spacer>
    <router-link v-for="item in items.filter(item => item.show !== false)" :key="item.path" color="white" variant="text"
      :to="item.path" :class="{ 'active-link': $route.path === item.path }" class="item navbar-item" rounded="0">
      {{ item.title }}
    </router-link>
    <div v-if="!store.getters.isLoggedIn">
      <router-link to="/register" rounded="xl" text v-text="'Sign In'" class="sign-up navbar-item"></router-link>
      <router-link to="/login" rounded="xl" text v-text="'Login'" class="login navbar-item"></router-link>
    </div>
  </v-app-bar>
  <v-navigation-drawer style="
        top: 84px !important;
        background: #1b1b1b;
        color: white;
        position: fixed;
        max-height: 100vh;
        " v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item @click="drawer = !drawer" :to="item.path" v-for="(item, index) in items" :key="item.path">
          <v-list-item-title @click="tab = index">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>

      <Sidebar />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import store from '@/store';

export default {
  name: "Header",
  components: {
    Sidebar
  },
  data() {
    return {
      drawer: false,
      store,
      tab: null,
      items: [
        { title: 'Tools', path: '/image-generator/advanced-mode' },
        { title: 'About us', path: '/about-us' },
        { title: 'Contact us', path: '/contact-us' },
        { title: 'Pricing', path: '/pricing' },
        { title: 'Login', path: '/login', show: false },
        { title: 'Sign in', path: '/register', show: false },
      ],
    }
  },
};
</script>

<style scoped type="scss">
header {
  padding: 20px 146px 0 151px !important;
  background: url("../assets/header-gradient.svg") rgb(36 36 36 / 0%) !important;
}

.spacer-first {
  display: block;
}

.spacer-second {
  display: none;
}

.mobile-btn {
  display: none;
}

@media (max-width: 1200px) {
  header {
    padding: 20px 30px 0 30px !important;
  }
}

@media (max-width: 900px) {
  .logo {
    width: 70px !important;
    height: 40px !important;
  }

  header {
    padding: 20px 10px 0 10px !important;
  }
}

@media (max-width: 768px) {
  .navbar-item {
    display: none;
  }

  .mobile-btn {
    display: block;
  }

  .spacer-first {
    display: none;
  }

  .spacer-second {
    display: block;
  }
}

.logo {
  width: 70px;
  height: 40px;
}

.logo-container {
  color: white;
  text-decoration: none;
  font-size: xx-large;
  vertical-align: baseline;
  display: flex;
  column-gap: 10px;
  font-weight: bold;
}

.item {
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  text-transform: none;
  text-decoration: none;
  margin-right: 30px;
  padding-bottom: 10px;
  margin-top: 10px;
}

.item:hover {
  background-color: transparent;
  color: #D1A658;
}

.active-link {
  border-bottom: 2px solid #D1A658;
}

.sign-up {
  padding: 13px 23px 13px 23px;
  min-height: 45px;
  background-color: #D1A658;
  text-transform: none;
  font-size: 16px;
  color: #242424;
  margin-left: 10px;
  text-decoration: none;
  border-radius: 71px;
}

.login {
  padding: 13px 23px 13px 23px;
  min-height: 45px;
  text-decoration: none;
  border-radius: 71px;
  background-color: #2F2F2F;
  text-transform: none;
  font-size: 16px;
  color: #ffffff;
  margin-left: 10px;
}
</style>
