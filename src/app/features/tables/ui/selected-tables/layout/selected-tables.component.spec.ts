import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SelectedTablesComponent } from "./selected-tables.component";

describe("SelectedTablesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SelectedTablesComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SelectedTablesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
