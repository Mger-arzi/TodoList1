import type { Meta, StoryObj } from '@storybook/react';
import{ AppWithRedux }from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from '../decorator/ReduxStoreProviderDecorator';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],
    parameters:{
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {
    render: () => <AppWithRedux/>,
}
