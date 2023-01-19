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

export type ApproveTableInOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ApproveTableInOrderMutation {
	__typename?: "Mutation";
	approveTableInOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type RejectTableInOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface RejectTableInOrderMutation {
	__typename?: "Mutation";
	rejectTableInOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type SetPaidStatusForProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
}>;

export interface SetPaidStatusForProductsInOrderMutation {
	__typename?: "Mutation";
	setPaidStatusForProductsInOrder: { __typename?: "ProductToOrderEntity"; id: string }[];
}

export type ConnectPaymentSystemToPlaceMutationVariables = Types.Exact<{
	body: Types.ConnectPaymentSystemToPlaceInput;
}>;

export interface ConnectPaymentSystemToPlaceMutation {
	__typename?: "Mutation";
	connectPaymentSystemToPlace: { __typename?: "PlaceToPaymentSystemEntity"; id: string };
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
export const ApproveTableInOrderDocument = gql`
	mutation ApproveTableInOrder($orderId: String!) {
		approveTableInOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ApproveTableInOrderGQL extends Apollo.Mutation<
	ApproveTableInOrderMutation,
	ApproveTableInOrderMutationVariables
> {
	override document = ApproveTableInOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RejectTableInOrderDocument = gql`
	mutation RejectTableInOrder($orderId: String!) {
		rejectTableInOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class RejectTableInOrderGQL extends Apollo.Mutation<
	RejectTableInOrderMutation,
	RejectTableInOrderMutationVariables
> {
	override document = RejectTableInOrderDocument;

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
export const ConnectPaymentSystemToPlaceDocument = gql`
	mutation ConnectPaymentSystemToPlace($body: ConnectPaymentSystemToPlaceInput!) {
		connectPaymentSystemToPlace(body: $body) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConnectPaymentSystemToPlaceGQL extends Apollo.Mutation<
	ConnectPaymentSystemToPlaceMutation,
	ConnectPaymentSystemToPlaceMutationVariables
> {
	override document = ConnectPaymentSystemToPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
