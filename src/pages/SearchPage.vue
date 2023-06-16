<template>
  <div class="container" >
    <h1 class="title">Search Page</h1>
    <b-input-group class="mt-3 d-flex">
      <b-form-input id="search_input"
        v-model="query"
        placeholder="Enter your Search"
        @keyup.enter="SearchRecipes(query,number)"
      ></b-form-input>
      <b-input-group-append>
        <b-dropdown :text="dropdownText" variant="outline-primary">
          <b-dropdown-item @click="selectAmount(5)">5</b-dropdown-item>
          <b-dropdown-item @click="selectAmount(10)">10</b-dropdown-item>
          <b-dropdown-item @click="selectAmount(15)">15</b-dropdown-item>
        </b-dropdown>
        <b-button variant="outline-primary" @click="SearchRecipes(query,number)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <div class="mt-3">
      <b-container>
        <h3>
          {{ "Recipes" }}:
          <slot></slot>
        </h3>
        <b-row id="waiting_animation" md="6" class="mb-3 d-flex justify-content-center" :class="{ hidden: isHidden, reveal: !isHidden }" :style="{ display: displayStyle }" >
          <b-icon icon="arrow-clockwise" animation="spin" font-scale="10" :style="{ display: displayStyle } "></b-icon>
        </b-row>
        <b-row v-if="chunkedRecipes.length > 0 ">
          <b-row v-for="(row, rowIndex) in chunkedRecipes" :key="rowIndex">
            <b-col v-for="recipe in row" :key="recipe.id">
              <RecipePreview class="recipePreview" :recipe="recipe" />
            </b-col>
          </b-row>
        </b-row>
        <div v-else-if="hasResponse">
          Not Found any recipe
        </div>
      </b-container>
    </div>
  </div>
</template>


<script>
import RecipePreview from "@/components/RecipePreview.vue";

export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      SearchWasClicked: false,
      lastQuery: "",
      isHidden: true,
      displayStyle: 'none',
      query: "",
      number: "5",
      selectedAmount: null,
      hasResponse: false,
      recipes: []
    };
  },
  computed: {
    dropdownText() {
      if (this.selectedAmount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.number = this.selectedAmount;
        return `Choose Amount (${this.selectedAmount})`;
      } else {
        return "Choose Amount (5)";
      }
    },
    chunkedRecipes() {
      if (!this.SearchWasClicked) {
        return this.$root.store.LastSearchRecipes
      }
      // Split recipes into chunks of size 5
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.SearchWasClicked = false;
      let chunk_back;
      chunk_back = this.recipes.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }
        result[chunkIndex].push(item);
        return result;
      }, []);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$root.store.LastSearchRecipes = chunk_back;
      return chunk_back
    }
  },
  methods: {
    toggleAnimation() {
      this.isHidden = !this.isHidden;
    },
    showWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'block'; // set display to 'block' to show the element
    },
    hideWatingAnimation() {
      this.toggleAnimation()
      this.displayStyle = 'none'; // set display to 'none' to hide the element
    },
    async SearchRecipes(query,number) {
      try {
        if (this.query !== "" && this.query !== undefined && this.query!== this.lastQuery) {
          this.showWatingAnimation()
          this.hasResponse = false;
          this.lastQuery = this.query;
          const response = await this.axios.get(
            `${this.$root.store.server_domain}/recipes/search?query=${encodeURIComponent(this.query)}&number=${encodeURIComponent(this.number)}`,
          );
          console.log(response);
          const recipes = response.data.recipes;
          this.recipes = [];
          this.hideWatingAnimation()
          this.hasResponse = true;
          this.SearchWasClicked = true;
          this.recipes.push(...recipes);
          console.log(this.recipes);
        }
      } catch (error) {
          console.log(error);
        }
      },

    selectAmount(amount) {
      this.selectedAmount = amount;
    }

  }
};
</script>

<style lang="scss" scoped>
.SearchRecipes{
  margin: 10px 0 10px;
}

#search_input{
  width: 75%;
}

.hidden {
  animation: fadeOut 1s ease-in-out forwards;
}

.reveal{
  animation: fadeIn 1s ease-in-out forwards;

}
.recipePreview {
  margin-left: 40px;
  align-items: center;
  width: 300px; /* Adjust the width as needed */
  height: auto; /* Adjust the height as needed */
  margin-bottom: 50px;
}
</style>