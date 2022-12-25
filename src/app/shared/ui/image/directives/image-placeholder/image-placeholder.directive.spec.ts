import { ImagePlaceholderDirective } from "./image-placeholder.directive";

describe("ImagePlaceholderDirective", () => {
	it("should create an instance", () => {
		const directive = new ImagePlaceholderDirective(null as any, null as any);
		expect(directive).toBeTruthy();
	});
});
