// Button.stories.js
import Label from './Label.vue';

export default {
    title: 'User Dropdown Menu',
    component: Label,
    argTypes: {
        Text: {control: 'text'},
        Color: {control: 'color'}
    }
};

const Template = (args) => ({
    components: { Label },
    setup() {
      return { args };
    },
    template: '<Label v-bind="args" v-text="args.label" :color="args.Color" />',
  });

export const Primary = Template.bind({});

Primary.args = { label: 'uwu', color: '#fff' }

