<template>
  <label v-if="label" class="fieldset">
    {{ label }}
  </label>
  <select
    :value="modelValue !== '' ? modelValue : (options?.[0]?.[keyField] ?? '')"
    class="select"
    :class="[additionalClass, disabled ? 'disabled-select' : '']"
    :disabled="disabled"
    @change="(e) => setValue(e.target.value)"
  >
    <option
      v-for="option in options"
      :key="option[keyField]"
      :value="option[keyField]"
      :selected="option[keyField] === modelValue"
    >
      {{ option[textField] }}
    </option>
  </select>
  <small class="text-error">{{ errorMessage }}</small>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Pilih',
  },
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  keyField: {
    type: String,
    default: 'value',
  },
  textField: {
    type: String,
    default: 'text',
  },
  additionalClass: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'handle-change']);
const setValue = (e) => {
  emit('update:modelValue', e);
  emit('handle-change');
};
</script>
