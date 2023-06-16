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
              <div>Likes: {{ recipe.popularity }} likes</div>
              <div> Servings: {{recipe.servings}} </div> 
              <div v-if="recipe.vegan">vegan:{{recipe.vegan}}</div>
              <div v-if="recipe.vegetarian">vegetarian:{{recipe.vegetarian}}</div>
              <div v-if="recipe.glutenFree">glutenFree</div>
              



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
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      response = this.$route.params.response;

      try {
        let id_param=this.$route.params.recipeId;
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
        // .map((fstep) => {
        //   fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //   return fstep.steps;
        // })
        // .reduce((a, b) => [...a, ...b], []);
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
    } catch (error) {
      console.log(error);
    }
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