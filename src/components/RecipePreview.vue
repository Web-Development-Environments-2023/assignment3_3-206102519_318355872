<template>
  <b-card no-body class="RecipePreview">
    <b-row no-gutters class="RecipeBody">
      <b-col>
        <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
           <b-card-img :src="recipe.image" alt="Image" class="RecipeImage"></b-card-img>
        </router-link>
        <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
           <b-card-title  class="RecipeTitle">{{recipe.title}}</b-card-title>
        </router-link>
        <div class="RecipeFooter">
          <div>
            <b-icon v-if="recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;">  {{ recipe.readyInMinutes }} minutes</a>
            <b-icon v-if="recipe.aggregateLikes>-1" icon="heart" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;"> {{ recipe.popularity }} likes</a>   
          </div>
           <div>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegan" variant="success">Vegan</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
          </div>
          <div v-if="$root.store.username">
         <watchedFavoriteData style="margin-top: 5px;" :id="parseInt(this.recipe.id)" :watched="this.recipe.watched" :favorite="this.recipe.favorite">

         </watchedFavoriteData>
         </div>


        </div>


      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import watchedFavoriteData from "./watchedFavoriteData.vue";
export default {
  components: {
   watchedFavoriteData
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    
  },
}
</script>


<!--id: id,-->
<!--title: title,-->
<!--image: image,-->
<!--readyInMinutes: readyInMinutes,-->
<!--popularity: aggregateLikes,-->
<!--vegan: vegan,-->
<!--vegetarian: vegetarian,-->
<!--glutenFree: glutenFree-->
<style scoped>
.RecipePreview {
  padding-bottom: 10px;
  width: 320px;
  height: 330px;

}

.RecipePreview .RecipeBody .RecipeImage {
  width: 317px; 
  height: 180px; 
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.RecipePreview .RecipeFooter {
  text-align: center;
  font-size: 14px;
}

.RecipeBody .RecipeTitle {
  padding-top: 10px;
  width: 95%;
  font-size: 18px;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}


</style>