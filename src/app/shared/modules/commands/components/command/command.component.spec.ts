import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CommandComponent } from "./command.component";

describe("CommandComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CommandComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CommandComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
