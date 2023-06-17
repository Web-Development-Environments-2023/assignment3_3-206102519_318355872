<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RandomRecipes",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/main_page_3_random"
        );

        let recipes = response.data.recipes;

        for (let recipe of recipes) {
          await this.updateWatchedFavorite(recipe);
        }

        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    },
    async updateWatchedFavorite(recipe) {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/CheckFavoriteWatched/" + recipe.id,
          { withCredentials: true }
        );

        const watchedFavoriteData = response.data;
        recipe.watched = watchedFavoriteData[recipe.id].watched;
        recipe.favorite = watchedFavoriteData[recipe.id].favorite;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
