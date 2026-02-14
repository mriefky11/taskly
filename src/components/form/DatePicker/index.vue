<template>
  <div class="w-full">
    <label v-if="label" class="fieldset">
      {{ label }}
    </label>
    <input
      type="date"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input mt-1 w-full"
      :class="[additionalClass, disabled ? 'disabled-input' : '']"
      @input="onInput"
    />
    <small class="text-error">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Pilih tanggal',
  },
  label: {
    type: String,
    default: '',
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

const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
