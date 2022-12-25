import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CommandsComponent } from "./commands.component";

describe("CommandsComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CommandsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CommandsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
