<template>
  <fieldset class="fieldset">
    <legend v-if="label" class="fieldset-legend">{{ label }}</legend>
    <input
      :id="name"
      :type="type"
      :value="modelValue"
      :maxlength="maxlength"
      class="input input-bordered w-full"
      :class="inputClass"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="isReadonly"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot name="additional-message">
      <p class="fieldset-label">{{ additionalMessage }}</p>
    </slot>
    <p class="text-error">{{ errorMessages }}</p>
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
  type: {
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
  inputClass: {
    type: String,
    required: false,
  },
  maxlength: {
    type: Number,
    required: null,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
  isReadonly: {
    type: Boolean,
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});
</script>
