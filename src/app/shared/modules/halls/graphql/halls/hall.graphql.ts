import { gql } from "apollo-angular";

export const HALL_QUERY = gql`
	query getHall($id: String!) {
		hall(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;
