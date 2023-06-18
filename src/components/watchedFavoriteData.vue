<template>
    <div>
        <b-avatar v-if="watched===true" button icon="check" variant="success" :size="24"
             v-b-popover.hover.top="'You had watched this recipe '"/>
        <b-avatar v-if="favorite===false" button icon="heart" variant="danger" :size="24"
              v-b-popover.hover.top="'click to add the recipe to your favorites'"
              v-on:click="addRecipeToFavorites"/>
        <b-avatar v-if="favorite===true" button icon="heart-fill" variant="danger"  :size="24"
              v-b-popover.hover.top="'This recipe is in your favorites list'" />
    </div>
</template>

<script>
export default {
    props:{
        watched:{
            type:Boolean
        },
        favorite:{
            type:Boolean
        },
        id:{
            type:Number
        }
    },
    methods: {
  async addRecipeToFavorites() {
    try {
      const recipe_id = this.id;

      const response = await this.axios.post(
        this.$root.store.server_domain + "/users/favorites",
        { recipeId: recipe_id },
        { withCredentials: true }
      );

      if (response.status === 200) {
        this.favorite = true; // Set favorite to true after successfully adding to favorites
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        this.$root.store.logout();
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } else {
        this.$router.push("*").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  },
}

};
</script>