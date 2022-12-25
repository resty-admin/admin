import { HideIfNoContentDirective } from "./hide-if-no-content.directive";

describe("HideIfNoContentDirective", () => {
	it("should create an instance", () => {
		const directive = new HideIfNoContentDirective(null as any);
		expect(directive).toBeTruthy();
	});
});
