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
      class="input mt-1"
      :class="[additionalClass, disabled ? 'disabled-input' : '']"
      @change="(e) => updateDate(e.target.value)"
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

const emit = defineEmits(['update:modelValue', 'handle-change']);

const updateDate = (value) => {
  emit('update:modelValue', value);
  emit('handle-change');
};
</script>
