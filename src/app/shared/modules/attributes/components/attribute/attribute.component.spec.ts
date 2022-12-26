import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AttributeComponent } from "./attribute.component";

describe("CategoryComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AttributeComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AttributeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
