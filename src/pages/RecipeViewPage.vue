<template>
<div class="background">
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div> {{ recipe.popularity }} likes</div>
              <div> Servings: {{recipe.servings}} </div> 
              <div>
              <watchedFavoriteData class="text-left" style=" margin-right: 25%"
                                        :id="parseInt(this.recipe.id)"
                                        :watched="this.recipe.watched"
                                        :favorite="this.recipe.favorite">
              </watchedFavoriteData>
              </div>
              <div class="specialthings">
            <b-badge style="margin-top: 10px;" v-if="recipe.vegan" variant="success">Vegan</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
            <b-badge style="margin-top: 10px;" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
              </div>
            </div>
            <div class="ingredients">
            <h2>Ingredients:</h2>
            <ul>
              <li
                v-for="(r,index) in recipe.extendedIngredients"
                :key=" '_' +index"
              >
                {{ r }}
              </li>
            </ul>
            </div>
          </div>
          <div class="wrapped">
            <div class="instructions">
            <h2>Instructions:</h2>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.description }}
              </li>
            </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</div>
</template>

<script>
import watchedFavoriteData from "@/components/watchedFavoriteData.vue";

export default {
  components: { watchedFavoriteData },
  data() {
    return {
      recipe: null,
      favorite:false
    };
  },
  async created() {
    try {
      let response;
      response = this.$route.params.response;
      const id_param=this.$route.params.recipeId;
      this.favorite=this.$route.params.favorite;

      try {
        
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes/"+id_param
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree
      } = response.data.recipe;

      let _instructions = [];
       
      for(let i=0; i<analyzedInstructions.length; i++){
        _instructions.push(analyzedInstructions[i]);
      }

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree
      };

      this.recipe = _recipe;
      if(this.$root.store.username){
        try{
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/AddToWatched",
          { recipeId: id_param },
        { withCredentials: true }

        );


      }catch(error){
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
    }
    }
     catch (error) {
      console.log(error);
    }
  },
  methods: {
  async addRecipeToFavorites() {
    try {
      const recipe_id = this.$route.params.recipeId;

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

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}


.container {
  max-width: 800px; /* Adjust the maximum width of the container to your preference */
  padding: 20px;
  background-color: #fff; /* Set the background color to white */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a box shadow for a subtle effect */
}
/* .recipe-header{

} */
.ingredients {
  margin-bottom: 20px;
}
.ingredients h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
.instructions h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.instructions ol {
  counter-reset: steps;
  margin-left: 0;
  padding-left: 20px;
}

.instructions li {
  counter-increment: steps;
  margin-bottom: 10px;
  list-style-type: none;
}
.instructions li:before {
  content: counter(steps);
  color: #888;
  margin-right: 5px;
}
</style>