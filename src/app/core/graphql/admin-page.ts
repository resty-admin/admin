import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../graphql";
export type AdminOrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface AdminOrderQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; type: Types.OrderTypeEnum; id: string; code: number } | null;
}

export type AdminCompaniesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AdminCompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		page: number;
		totalCount: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
}

export type AdminPlacesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AdminPlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "PlaceEntity";
					id: string;
					name: string;
					verificationStatus: Types.PlaceVerificationStatusEnum;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export const AdminOrderDocument = gql`
	query AdminOrder($orderId: String!) {
		order(id: $orderId) {
			type
			id
			code
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AdminOrderGQL extends Apollo.Query<AdminOrderQuery, AdminOrderQueryVariables> {
	override document = AdminOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const AdminCompaniesDocument = gql`
	query AdminCompanies($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		companies(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AdminCompaniesGQL extends Apollo.Query<AdminCompaniesQuery, AdminCompaniesQueryVariables> {
	override document = AdminCompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const AdminPlacesDocument = gql`
	query AdminPlaces($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		places(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
				verificationStatus
				file {
					id
					url
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AdminPlacesGQL extends Apollo.Query<AdminPlacesQuery, AdminPlacesQueryVariables> {
	override document = AdminPlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
