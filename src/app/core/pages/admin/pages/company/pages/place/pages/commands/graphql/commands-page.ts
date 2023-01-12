import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type CommandsPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface CommandsPageQuery {
	__typename?: "Query";
	commands: {
		__typename?: "PaginatedCommand";
		page: number;
		totalCount: number;
		data?: { __typename?: "CommandEntity"; id: string; name: string; description: string }[] | null;
	};
}

export const CommandsPageDocument = gql`
	query CommandsPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		commands(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
				description
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CommandsPageGQL extends Apollo.Query<CommandsPageQuery, CommandsPageQueryVariables> {
	override document = CommandsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
