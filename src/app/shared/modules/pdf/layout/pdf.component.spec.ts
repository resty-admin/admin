import { TestBed } from "@angular/core/testing";

import { PdfComponent } from "./pdf.component";

describe("PdfComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [PdfComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(PdfComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
