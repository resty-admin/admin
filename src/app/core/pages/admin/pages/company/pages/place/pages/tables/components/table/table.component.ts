import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	@Input() table: any;
	@Input() actions: any;
}
