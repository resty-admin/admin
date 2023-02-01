import { ContentChild, Directive, Input, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appColumn]"
})
export class ColumnDirective {
	@ContentChild("header") headerTempalte!: TemplateRef<any>;
	@ContentChild("value") valueTemplate!: TemplateRef<any>;
	@Input() appColumn!: string;
}
