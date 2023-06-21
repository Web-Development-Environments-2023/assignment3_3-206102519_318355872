<template>
  <div class="background">
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1 class="recipe-header">{{ recipe.title }}</h1>
          <img :src="require('@/assets/' + recipe.image)" class="center" style="width: 500px; height: 400px;" />
        </div>
        <div class="specialthings">
          <b-badge style="margin-top: 10px;" v-if="recipe.vegan" variant="success">Vegan</b-badge>
          <b-badge style="margin-top: 10px;" v-if="recipe.vegetarian" variant="success">Vegetarian</b-badge>
          <b-badge style="margin-top: 10px;" v-if="recipe.glutenFree" variant="success">Gluten free</b-badge>
        </div>
        <div class="regular-details">
          <b-icon v-if="this.recipe.readyInMinutes" icon="clock" style="width: 15px; height: 15px;"></b-icon>
          <a style="margin-right: 10px; margin-bottom: 20px;">{{ this.recipe.readyInMinutes }} minutes</a>
          <br/>
          <a>Servings: {{ this.recipe.servings }}</a>
          <br/>
          <a >Who make it?<br/> {{this.recipe.chef}}</a>
        <br/>
        <a >When we make it?<br/> {{this.recipe.occasion}}</a>
        <br/>
        <a >About<br/> {{this.recipe.about}}</a>



        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
                <br/>
              <h2>Ingredients:</h2>
              <ul>
                <li v-for="(r,index) in recipe.extendedIngredients" :key="'_' + index">
                  {{ r }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <h2>Instructions:</h2>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.number">
                  {{ s.description }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      response = this.$route.params.response;
      const id_param = this.$route.params.recipeId;

      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/users/GetFamilyRecipes",
          { withCredentials: true }
        );

        let recipes = response.data["result"];
        for (let recipe of recipes) {
          if (recipe.id === id_param) {
            this.recipe = recipe;
          }
        }

        if (this.recipe !== null) {
          const instructions = this.recipe.instructions;
          const steps = instructions.split(/\d+\.\s/).filter(Boolean);

          const analyzedInstructions = steps.map((step, index) => {
            return {
              number: index + 1,
              description: step.trim(),
            };
          });

          this.recipe.instructions = analyzedInstructions;
          const extendedIngredients = this.recipe.extendedIngredients.split(',');

          this.recipe.extendedIngredients = extendedIngredients;
        }

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.recipe-header {
  text-align: center;
}

.recipe-header h1 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

.container {
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.recipe-body {
  display: flex;
  flex-direction: column;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.wrapped {
  width: 100%;
}

.wrapped h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
