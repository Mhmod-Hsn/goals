import type { Meta, StoryObj } from "@storybook/react";

import { AnimatedGradient } from "./AnimatedGradient";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "MicroInteractions/AnimatedGradient",
	component: AnimatedGradient,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {},
} satisfies Meta<typeof AnimatedGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		children: <div className="">Some attractive text will be here</div>,
		className:
			"w-[600px] h-[300px] flex items-center justify-center text-2xl font-semibold rounded-3xl ",
	},
};
