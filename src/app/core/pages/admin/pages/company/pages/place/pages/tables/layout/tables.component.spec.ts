import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TablesComponent } from "./tables.component";

describe("TablesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TablesComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(TablesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
