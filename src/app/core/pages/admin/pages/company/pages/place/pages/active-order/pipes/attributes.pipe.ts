import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";
import type { AttributeToProductEntity } from "@graphql";

@Pipe({ name: "attributesPipe" })
export class AttributesPipe implements PipeTransform {
	transform(atrributesToProduct: AttributeToProductEntity[]) {
		return atrributesToProduct
			.reduce((str, attributeToProduct) => `${str} ${attributeToProduct.attribute.name},`, "")
			.slice(0, -1);
	}
}
