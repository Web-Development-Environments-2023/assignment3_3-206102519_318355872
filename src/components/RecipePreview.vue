<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview zoom custom-link"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image"/>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes}} minutes</li>
        <li>{{ recipe.popularity }} likes</li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
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
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    readyInMinutes: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    popularity: {
      type: Number,
      required: false,
      default() {
        return undefined;
      },
      vegan:
        {
          type: Number,
          required: false,
          default() {
            return undefined;
          },
        },
      vegetarian:{
        type: Number,
        required: false,
        default() {
          return undefined;
        },
      },
      glutenFree:{
        type: Number,
        required: false,
        default() {
          return undefined;
        },
      }
    }
  }
};
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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  background-color: white;
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;

}

.recipe-preview .recipe-body .recipe-image {
  border-radius: 15px;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 1%;
  margin-bottom: 1%;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
  align-content: center;
}

.recipe-preview .recipe-footer .recipe-title {
  width: 100%;
  font-size: 13pt;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  font-size: 15px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.zoom {
    transition: transform .2s; /* Animation */
    transform-origin: center;
}

.zoom:hover {
    z-index: 999999;
    transform: scale(1.3); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.custom-link {
    color: black;
}
</style>
