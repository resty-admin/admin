import type { Meta, Story } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

import { ToastrModule } from "../../toastr.module";
import { ToastrErrorComponent } from "./toastr-error.component";

export default {
	title: "ToastrErrorComponent",
	component: ToastrErrorComponent,
	decorators: [
		moduleMetadata({
			imports: [ToastrModule]
		})
	]
} as Meta<ToastrErrorComponent>;

const Template: Story<ToastrErrorComponent> = (args: ToastrErrorComponent) => ({
	props: args
});

export const Primary = Template.bind({});
