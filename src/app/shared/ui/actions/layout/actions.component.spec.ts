import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ActionsComponent } from "./actions.component";

describe("ActionsComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ActionsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ActionsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
