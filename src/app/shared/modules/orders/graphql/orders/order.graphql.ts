import { gql } from "apollo-angular";

export const ORDER_QUERY = gql`
	query getOrder($id: String!) {
		order(id: $id) {
			id
			orderCode
		}
	}
`;
