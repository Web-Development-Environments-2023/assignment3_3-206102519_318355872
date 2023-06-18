<template>
  <div>
    <div class="container">
      <h1 class="title">Main Page</h1>
      <b-row>
        <b-col>
          <RandomRecipes title="Random Recipes" />
        </b-col>
        <b-col v-if="!$root.store.username">
            <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this
            </router-link>
        </b-col>
        <b-col v-else>
        <WatchedRecipes title="Last Viewed Recipes"></WatchedRecipes>
        </b-col>
      </b-row>
      
      
      <!-- {{ !$root.store.username }} -->
    </div>
    
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RandomRecipes from "../components/RandomRecipes";
import WatchedRecipes from "../components/WatchedRecipes";

export default {
  components: {
    RandomRecipes,
    WatchedRecipes
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
