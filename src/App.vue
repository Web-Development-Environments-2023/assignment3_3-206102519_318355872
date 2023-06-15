<template>
  <div id="app">
    <div id="nav">
    <b-navbar>
    <b-navbar-nav>
      <b-nav-item><router-link :to="{ name: 'main' }">Main</router-link></b-nav-item>
      <b-nav-item><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
      <b-nav-item><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>
      <b-navbar-nav class="ml-auto">
      <span v-if="!$root.store.username">
      <b-nav-item><router-link :to="{ name: 'register' }">Register</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </b-nav-item>
      </span>
      <span v-else>
        <b-nav-item>
          <span class="mr-2">{{ $root.store.username }}:</span>
          <button class="button-4" @click="Logout">Logout</button>
        </b-nav-item>
      </span>
      </b-navbar-nav>
    </b-navbar-nav>
  </b-navbar>
  <router-view />
    </div>
</div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.axios.post(this.$root.store.server_domain + "/Logout", {withCredentials: true})
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 50vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

#nav a.router-link-exact-active {
  color: rgb(0, 0, 0);
}

.button-4 {
 appearance: none;
 background-color: #FAFBFC;
 border: 1px solid rgba(27, 31, 35, 0.15);
 border-radius: 6px;
 box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
 box-sizing: border-box;
 color: #24292E;
 cursor: pointer;
 display: inline-block;
 font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
 font-size: 14px;
 font-weight: 500;
 line-height: 20px;
 list-style: none;
 padding: 6px 16px;
 position: relative;
 transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 vertical-align: middle;
 white-space: nowrap;
 word-wrap: break-word;
}

.button-4:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.button-4:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.button-4:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.button-4:focus {
  outline: 1px transparent;
}

.button-4:before {
  display: none;
}

.button-4::-webkit-details-marker {
  display: none;
}
</style>
