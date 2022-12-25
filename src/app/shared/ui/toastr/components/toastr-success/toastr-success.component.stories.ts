import type { Meta, Story } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

import { ToastrModule } from "../../toastr.module";
import { ToastrSuccessComponent } from "./toastr-success.component";

export default {
	title: "ToastrSuccessComponent",
	component: ToastrSuccessComponent,
	decorators: [
		moduleMetadata({
			imports: [ToastrModule]
		})
	]
} as Meta<ToastrSuccessComponent>;

const Template: Story<ToastrSuccessComponent> = (args: ToastrSuccessComponent) => ({
	props: args
});

export const Primary = Template.bind({});
