import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CategoryComponent } from "./category.component";

describe("CategoryComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CategoryComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CategoryComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
