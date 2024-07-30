<template lang="pug">
.sort
  button.sort-button(@click="showModal = true") {{ selectedOptionText }}

  .sort-modal(v-if="showModal")
    .modal-overlay(@click="showModal = false")
    .modal-content(:class="showModal ? 'modal-content--open' : ''") 
      label.sort-label( v-for="option in options" :key="option.value")
        input.sort-input(type="radio" :value="option.value" v-model="selectedSort" @change="updateSort")
        | {{ option.text }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

const options = [
  { value: "high", text: "Сначала дорогие" },
  { value: "low", text: "Сначала дешевые" },
  { value: "popular", text: "Сначала Популярные" },
  { value: "new", text: "Сначала Новые" },
];

export default defineComponent({
  name: "FilterSort",

  setup() {
    const store = useStore();
    const selectedSort = ref(options[0].value);
    const showModal = ref(false);
    const updateSort = () => {
      store.commit("setSelectedSort", selectedSort.value);
    };

    const selectedOptionText = computed(() => {
      const option = options.find(
        option => option.value === selectedSort.value
      );
      return option ? option.text : "";
    });

    return {
      options,
      selectedSort,
      showModal,
      updateSort,
      selectedOptionText,
    };
  },
});
</script>

<style lang="scss" scoped>
.sort {
  min-width: 280px;
  grid-column: -1 / -2;
  grid-row: 1 / 2;
  font-family: $font-family;
  font-weight: 500;
  font-size: $fz-12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  justify-self: end;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  text-align: end;

  @media (max-width: ($size_tablet - 1px)) {
    min-width: auto;
  }
}

.sort-button {
  position: relative;
  text-transform: uppercase;
  padding-right: 15px;
  font-weight: 500;
  font-size: $fz-12px;
  letter-spacing: 0.06em;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $color-dark;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.sort-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color-dark--070;
  z-index: 1;
}

.modal-content {
  width: 100%;
  background: $color-light;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  transform: translate(0px, 81px);
  text-align: start;
}

.sort-label {
  padding: 16px 24px;
  text-wrap: nowrap;
  cursor: pointer;

  &:has(.sort-input:checked) {
    background-color: $color-brand;
  }
}

.sort-input {
  width: 0;
  position: absolute;
  right: 0;
}
</style>
