import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { UsersComponent } from "./users.component";

describe("UsersComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [UsersComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(UsersComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
