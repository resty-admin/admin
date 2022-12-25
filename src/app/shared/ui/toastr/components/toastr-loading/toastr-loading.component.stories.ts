import type { Meta, Story } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

import { ToastrModule } from "../../toastr.module";
import { ToastrLoadingComponent } from "./toastr-loading.component";

export default {
	title: "ToastrLoadingComponent",
	component: ToastrLoadingComponent,
	decorators: [
		moduleMetadata({
			imports: [ToastrModule]
		})
	]
} as Meta<ToastrLoadingComponent>;

const Template: Story<ToastrLoadingComponent> = (args: ToastrLoadingComponent) => ({
	props: args
});

export const Primary = Template.bind({});
