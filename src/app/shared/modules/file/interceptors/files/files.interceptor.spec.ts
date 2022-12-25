import { TestBed } from "@angular/core/testing";

import { FilesInterceptor } from "./files.interceptor";

describe("FilesInterceptor", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [FilesInterceptor]
		})
	);

	it("should be created", () => {
		const interceptor: FilesInterceptor = TestBed.inject(FilesInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
