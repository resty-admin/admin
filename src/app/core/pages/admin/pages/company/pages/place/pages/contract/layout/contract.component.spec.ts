import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ContractComponent } from "./contract.component";

describe("ContractComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ContractComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ContractComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
