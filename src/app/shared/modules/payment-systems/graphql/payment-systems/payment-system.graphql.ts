import { gql } from "apollo-angular";

export const PAYMENT_SYSTEM_QUERY = gql`
	query getPayment($id: String!) {
		payment(id: $id) {
			id
			name
		}
	}
`;
