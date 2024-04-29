import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        oldTitle: {
            description: 'Start value empty. Add value push button set string.'
        },
        callBack: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        callBack: action('Value EditableSpan changed'),
        oldTitle: 'Start '
    }
};
