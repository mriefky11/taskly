<template>
  <fieldset class="fieldset">
    <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
    <textarea
      :id="name"
      :name="name"
      :value="modelValue"
      class="textarea"
      :class="additionalClass"
      :placeholder="placeholder"
      @input="setValue($event.target.value)"
    ></textarea>
    <small class="text-error">{{ errorMessage }}</small>
  </fieldset>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  additionalMessage: {
    type: String,
    required: false,
  },
  errorMessages: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue', 'handle-change']);
const setValue = (value) => {
  emit('update:modelValue', value);
  emit('handle-change');
};
</script>
