import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { WorkersComponent } from "./workers.component";

describe("WorkersComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [WorkersComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(WorkersComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
