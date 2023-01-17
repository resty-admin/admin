import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { UsersSelectComponent } from "./users-select.component";

describe("UsersSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [UsersSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(UsersSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
