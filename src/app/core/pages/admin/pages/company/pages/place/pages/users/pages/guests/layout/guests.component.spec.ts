import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { GuestsComponent } from "./guests.component";

describe("UsersComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [GuestsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(GuestsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
