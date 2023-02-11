import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CreateOrderMutationVariables = Types.Exact<{
	order: Types.CreateOrderInput;
}>;

export interface CreateOrderMutation {
	__typename?: "Mutation";
	createOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type UpdateOrderMutationVariables = Types.Exact<{
	order: Types.UpdateOrderInput;
}>;

export interface UpdateOrderMutation {
	__typename?: "Mutation";
	updateOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type DeleteOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface DeleteOrderMutation {
	__typename?: "Mutation";
	deleteOrder: string;
}

export type CloseOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface CloseOrderMutation {
	__typename?: "Mutation";
	closeOrder: string;
}

export type CancelOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface CancelOrderMutation {
	__typename?: "Mutation";
	cancelOrder: string;
}

export type ApproveProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
}>;

export interface ApproveProductsInOrderMutation {
	__typename?: "Mutation";
	approveProductsInOrder: { __typename?: "ProductToOrderEntity"; id: string }[];
}

export type RejectProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
}>;

export interface RejectProductsInOrderMutation {
	__typename?: "Mutation";
	rejectProductsInOrder: { __typename?: "ProductToOrderEntity"; id: string }[];
}

export type ApproveOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ApproveOrderMutation {
	__typename?: "Mutation";
	approveOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type RejectOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface RejectOrderMutation {
	__typename?: "Mutation";
	rejectOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type SetPaidStatusForProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
}>;

export interface SetPaidStatusForProductsInOrderMutation {
	__typename?: "Mutation";
	setPaidStatusForProductsInOrder: { __typename?: "ProductToOrderEntity"; id: string }[];
}

export const CreateOrderDocument = gql`
	mutation CreateOrder($order: CreateOrderInput!) {
		createOrder(order: $order) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateOrderGQL extends Apollo.Mutation<CreateOrderMutation, CreateOrderMutationVariables> {
	override document = CreateOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateOrderDocument = gql`
	mutation UpdateOrder($order: UpdateOrderInput!) {
		updateOrder(order: $order) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateOrderGQL extends Apollo.Mutation<UpdateOrderMutation, UpdateOrderMutationVariables> {
	override document = UpdateOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteOrderDocument = gql`
	mutation DeleteOrder($orderId: String!) {
		deleteOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteOrderGQL extends Apollo.Mutation<DeleteOrderMutation, DeleteOrderMutationVariables> {
	override document = DeleteOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CloseOrderDocument = gql`
	mutation CloseOrder($orderId: String!) {
		closeOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class CloseOrderGQL extends Apollo.Mutation<CloseOrderMutation, CloseOrderMutationVariables> {
	override document = CloseOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CancelOrderDocument = gql`
	mutation CancelOrder($orderId: String!) {
		cancelOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class CancelOrderGQL extends Apollo.Mutation<CancelOrderMutation, CancelOrderMutationVariables> {
	override document = CancelOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ApproveProductsInOrderDocument = gql`
	mutation ApproveProductsInOrder($productToOrderIds: [String!]!) {
		approveProductsInOrder(productToOrderIds: $productToOrderIds) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ApproveProductsInOrderGQL extends Apollo.Mutation<
	ApproveProductsInOrderMutation,
	ApproveProductsInOrderMutationVariables
> {
	override document = ApproveProductsInOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RejectProductsInOrderDocument = gql`
	mutation RejectProductsInOrder($productToOrderIds: [String!]!) {
		rejectProductsInOrder(productToOrderIds: $productToOrderIds) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class RejectProductsInOrderGQL extends Apollo.Mutation<
	RejectProductsInOrderMutation,
	RejectProductsInOrderMutationVariables
> {
	override document = RejectProductsInOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ApproveOrderDocument = gql`
	mutation ApproveOrder($orderId: String!) {
		approveOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ApproveOrderGQL extends Apollo.Mutation<ApproveOrderMutation, ApproveOrderMutationVariables> {
	override document = ApproveOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RejectOrderDocument = gql`
	mutation RejectOrder($orderId: String!) {
		rejectOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class RejectOrderGQL extends Apollo.Mutation<RejectOrderMutation, RejectOrderMutationVariables> {
	override document = RejectOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SetPaidStatusForProductsInOrderDocument = gql`
	mutation SetPaidStatusForProductsInOrder($productToOrderIds: [String!]!) {
		setPaidStatusForProductsInOrder(productToOrderIds: $productToOrderIds) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SetPaidStatusForProductsInOrderGQL extends Apollo.Mutation<
	SetPaidStatusForProductsInOrderMutation,
	SetPaidStatusForProductsInOrderMutationVariables
> {
	override document = SetPaidStatusForProductsInOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
