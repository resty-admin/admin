import { gql } from "apollo-angular";

export const COMMANDS_QUERY = gql`
	query getCommands($skip: Int!, $take: Int!) {
		commands(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;
