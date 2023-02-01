import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MoreComponent } from "./more.component";

describe("MoreComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [MoreComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(MoreComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
