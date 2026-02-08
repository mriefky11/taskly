import TextInput from '@/components/form/TextInput/index.vue';
import TextArea from '@/components/form/TextArea/index.vue';
import Select from '@/components/form/Select/index.vue';
import DatePicker from '@/components/form/DatePicker/index.vue';

export const component = (app) => {
  app.component('TextInput', TextInput);
  app.component('TextArea', TextArea);
  app.component('Select', Select);
  app.component('DatePicker', DatePicker);
  return app;
};
