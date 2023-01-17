import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TableQrCodeDialogComponent } from "./table-qr-code-dialog.component";

describe("TableQrCodeDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TableQrCodeDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(TableQrCodeDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
