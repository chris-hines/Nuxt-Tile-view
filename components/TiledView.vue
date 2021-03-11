<template>
  <div class="tiled-view">
    <select class="tiled-view__select" v-on:change="handleSelectedChange($event.target.value)">
      <option v-for="breed in breeds" :value="breed">
        {{ breed }}
      </option>
    </select>
    <div class="tiled-view__content" @load.capture="handleLoad" v-show="loaded">
      <div class="tiled-view__item" v-for="(dog, index) in dogs" :key="index" >
        <img :src="dog" :alt="dog" :data-index="index">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      dogs () {
        return this.$store.state.dogs.list;
      },
      breeds () {
        return this.$store.state.dogs.breeds;
      }
    },
    watch: {
      breeds (val) {
        if(val.length) {
          this.handleSelectedChange(val[0]);
        }
      },
    },
    data () {
      return {
        loaded: null,
      }
    },
    methods: {
      handleSelectedChange (breed) {
        this.$nuxt.$loading.start();
        this.loaded = false;
        this.$store.dispatch('dogs/getDogs', breed);
      },
      handleLoad (e) {
        if(this.dogs.length == Number(e.target.dataset.index) + 1) {
          this.loaded = true;
          this.$nuxt.$loading.finish();
        }
      },
    },
    beforeMount() {
      this.$store.dispatch('dogs/getBreeds');
    }
  }
</script>
<style lang="scss">

  .tiled-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: start;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 90%;

    &__select {
      display: flex;
      align-self: start;
      margin-bottom: 1rem;
    }

    &__content {
      width: 100%;
      columns: 12rem;
      gap: 1rem;
    }

    &__item {
      display: flex;
      break-inside: avoid;
      justify-content: center;
      margin-bottom: 1rem;
      break-inside: avoid;

      img {
        border-radius: 3px;
        max-width: 100%;
      }
    }
}

</style>
