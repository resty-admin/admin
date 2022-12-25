import { gql } from "apollo-angular";

export const COMMAND_QUERY = gql`
	query getCommand($id: String!) {
		command(id: $id) {
			id
			name
		}
	}
`;
