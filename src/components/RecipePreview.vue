<template>
  <b-card no-body class="RecipePreview zoom">
    <b-row no-gutters class="RecipeBody">
      <b-col>

        <router-link :to="{ name: name, params: { recipeId: recipe.id,favorite:recipe.favorite } }">
          <div v-if="this.name==='MyfamilyRecipePageView'">
          <b-card-img :src="require('@/assets/' + recipe.image)" alt="Image" class="RecipeImage" style="width: 200px; height: 200px;">
          </b-card-img>
          </div>
          <div v-else>
            <b-card-img :src="recipe.image" alt="Image" class="RecipeImage" style="width: 200px; height: 200px;"></b-card-img>
          </div>
        </router-link>
        <router-link :to="{ name: name, params: { recipeId: recipe.id,favorite:recipe.favorite } }">
           <b-card-title  class="RecipeTitle">{{shortenTitle(recipe.title)}}</b-card-title>
        </router-link>
        <div class="RecipeFooter">
            <div>
              <watchedFavoriteData class="text-left" style=" margin-right: 25%"
                                    :id="parseInt(this.recipe.id)"
                                    :watched="this.recipe.watched"
                                    :favorite="this.recipe.favorite">
              </watchedFavoriteData>
            <b-icon v-if="recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;">  {{ recipe.readyInMinutes }} minutes</a>
            <b-icon v-if="recipe.popularity>-1" icon="heart" style="width: 15px; height: 15px;"></b-icon>
            <a style="margin-right: 10px; margin-bottom: 20px;"> {{ recipe.popularity }}</a>
          </div>
           <div>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegan" variant="success">Vegan</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
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
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  methods: {
    shortenTitle(title) {
      if (title.length <= 30) {
        return title;
      } else {
        return title.substring(0, 30) + '...';
      }
    }
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
    name:{
      type:String,
      required:true

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
  width: 100%;
  height: 330px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-bottom: 10px;

}


.RecipeBody .RecipeImage {
  border-radius: 15px;
  object-fit: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover; /* Adjust to "contain" if needed */
  background-position: center;
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
.zoom {
    transition: transform .2s; /* Animation */
    transform-origin: center;
}
.zoom:hover {
    z-index: 4;
    transform: scale(1.3); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.black-white {
    color: #000;
}

</style>