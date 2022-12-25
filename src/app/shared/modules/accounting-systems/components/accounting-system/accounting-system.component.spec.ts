import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AccountingSystemComponent } from "./accounting-system.component";

describe("AccountingSystemComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AccountingSystemComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AccountingSystemComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
