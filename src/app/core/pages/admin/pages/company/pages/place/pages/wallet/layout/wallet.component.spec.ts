import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { WalletComponent } from "./wallet.component";

describe("WalletComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [WalletComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(WalletComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
