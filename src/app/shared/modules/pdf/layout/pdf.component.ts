import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-pdf",
	templateUrl: "./pdf.component.html",
	styleUrls: ["./pdf.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfComponent {
	@Input() src = "";
}
