import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
}

export interface AccountingSystemEntity {
	__typename?: "AccountingSystemEntity";
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface ActiveOrderEntity {
	__typename?: "ActiveOrderEntity";
	id: Scalars["String"];
	orderCode: Scalars["String"];
	place: PlaceEntity;
	shift?: Maybe<ActiveShiftEntity>;
	status: OrderStatusEnum;
	table: TableEntity;
	type: OrderTypeEnum;
	users: UserEntity[];
}

export interface ActiveOrderEntityInput {
	orderCode: Scalars["String"];
	place: PlaceEntityInput;
	shift?: InputMaybe<ActiveShiftEntityInput>;
	status: OrderStatusEnum;
	table: TableEntityInput;
	type: OrderTypeEnum;
	users: UserEntityInput[];
}

export interface ActiveShiftEntity {
	__typename?: "ActiveShiftEntity";
	id: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
	place?: Maybe<PlaceEntity>;
	shiftDate: Scalars["String"];
	table?: Maybe<TableEntity>;
	waiter?: Maybe<UserEntity>;
}

export interface ActiveShiftEntityInput {
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
	place?: InputMaybe<PlaceEntityInput>;
	shiftDate: Scalars["String"];
	table?: InputMaybe<TableEntityInput>;
	waiter?: InputMaybe<UserEntityInput>;
}

export interface AttributesEntity {
	__typename?: "AttributesEntity";
	attributesGroup?: Maybe<AttributesGroupEntity>;
	id: Scalars["String"];
	name: Scalars["String"];
	price?: Maybe<Scalars["Int"]>;
}

export interface AttributesEntityInput {
	attributesGroup?: InputMaybe<AttributesGroupEntityInput>;
	name: Scalars["String"];
	price?: InputMaybe<Scalars["Int"]>;
}

export interface AttributesGroupEntity {
	__typename?: "AttributesGroupEntity";
	attributes?: Maybe<AttributesEntity[]>;
	id: Scalars["String"];
	isUniq?: Maybe<Scalars["Boolean"]>;
	name: Scalars["String"];
	place: PlaceEntity;
	products?: Maybe<ProductEntity[]>;
}

export interface AttributesGroupEntityInput {
	attributes?: InputMaybe<AttributesEntityInput[]>;
	isUniq?: InputMaybe<Scalars["Boolean"]>;
	name: Scalars["String"];
	place: PlaceEntityInput;
	products?: InputMaybe<ProductEntityInput[]>;
}

export interface CategoryEntity {
	__typename?: "CategoryEntity";
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	name: Scalars["String"];
	place: PlaceEntity;
	products: ProductEntity[];
}

export interface CategoryEntityInput {
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	place: PlaceEntityInput;
	products: ProductEntityInput[];
}

export interface CommandEntity {
	__typename?: "CommandEntity";
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface CompanyEntity {
	__typename?: "CompanyEntity";
	employees?: Maybe<UserEntity[]>;
	fondy?: Maybe<FondyEntity>;
	id: Scalars["String"];
	logo?: Maybe<FileEntity>;
	name: Scalars["String"];
	owner: UserEntity;
	places?: Maybe<PlaceEntity[]>;
	status: CompanyStatusEnum;
}

export interface CompanyEntityInput {
	employees?: InputMaybe<UserEntityInput[]>;
	fondy?: InputMaybe<FondyEntityInput>;
	logo?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	owner: UserEntityInput;
	places?: InputMaybe<PlaceEntityInput[]>;
	status: CompanyStatusEnum;
}

export enum CompanyStatusEnum {
	Approved = "APPROVED",
	Pending = "PENDING",
	Rejected = "REJECTED"
}

export interface CreateAccountingSystemInput {
	name: Scalars["String"];
}

export interface CreateAttributeGroupInput {
	isUniq: Scalars["Boolean"];
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateAttributeInput {
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface CreateCategoryInput {
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateCommandInput {
	name: Scalars["String"];
}

export interface CreateCompanyInput {
	logo?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
}

export interface CreateHallInput {
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	place: Scalars["String"];
}

export interface CreateOrderInput {
	place: Scalars["String"];
	type: OrderTypeEnum;
}

export interface CreatePlaceInput {
	address: Scalars["String"];
	company: Scalars["String"];
	file: FileEntityInput;
	holidayDays: WorkingHoursInput;
	name: Scalars["String"];
	weekDays: WorkingHoursInput;
	weekendDays: WorkingHoursInput;
}

export interface CreateProductInput {
	attrsGroups?: InputMaybe<Scalars["String"][]>;
	category: Scalars["String"];
	description: Scalars["String"];
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	price: Scalars["Float"];
}

export interface CreateShitInput {
	orders: Scalars["String"][];
	place: Scalars["String"];
	shiftDate: Scalars["String"][];
	table: Scalars["String"];
	waiter: Scalars["String"];
}

export interface CreateTableInput {
	file?: InputMaybe<FileEntityInput>;
	hall: Scalars["String"];
	name: Scalars["String"];
}

export interface FileEntity {
	__typename?: "FileEntity";
	id: Scalars["String"];
	url: Scalars["String"];
}

export interface FileEntityInput {
	url: Scalars["String"];
}

export interface FondyEntity {
	__typename?: "FondyEntity";
	company: CompanyEntity;
	id: Scalars["String"];
	merchantId: Scalars["String"];
	secretKey: Scalars["String"];
}

export interface FondyEntityInput {
	company: CompanyEntityInput;
	merchantId: Scalars["String"];
	secretKey: Scalars["String"];
}

export interface HallEntity {
	__typename?: "HallEntity";
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	name: Scalars["String"];
	place: PlaceEntity;
	tables?: Maybe<TableEntity[]>;
}

export interface HallEntityInput {
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	place: PlaceEntityInput;
	tables?: InputMaybe<TableEntityInput[]>;
}

export interface HistoryOrderEntity {
	__typename?: "HistoryOrderEntity";
	id: Scalars["String"];
	orderCode: Scalars["String"];
	place: PlaceEntity;
	shift?: Maybe<ActiveShiftEntity>;
	status: OrderStatusEnum;
	table: TableEntity;
	type: OrderTypeEnum;
	users: UserEntity[];
}

export interface HistoryOrderEntityInput {
	orderCode: Scalars["String"];
	place: PlaceEntityInput;
	shift?: InputMaybe<ActiveShiftEntityInput>;
	status: OrderStatusEnum;
	table: TableEntityInput;
	type: OrderTypeEnum;
	users: UserEntityInput[];
}

export interface HistoryShiftEntity {
	__typename?: "HistoryShiftEntity";
	id: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
	place?: Maybe<PlaceEntity>;
	shiftDate: Scalars["String"];
	table?: Maybe<TableEntity>;
	waiter?: Maybe<UserEntity>;
}

export interface HistoryShiftEntityInput {
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
	place?: InputMaybe<PlaceEntityInput>;
	shiftDate: Scalars["String"];
	table?: InputMaybe<TableEntityInput>;
	waiter?: InputMaybe<UserEntityInput>;
}

export interface LanguageEntity {
	__typename?: "LanguageEntity";
	file: FileEntity;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface Mutation {
	__typename?: "Mutation";
	createAccountingSystem: AccountingSystemEntity;
	createAttr: AttributesEntity;
	createAttrGroup: AttributesGroupEntity;
	createCategory: CategoryEntity;
	createCommand: CommandEntity;
	createCompany: CompanyEntity;
	createHall: HallEntity;
	createOrder: ActiveOrderEntity;
	createPlace: PlaceEntity;
	createProduct: ProductEntity;
	createShift: ActiveShiftEntity;
	createTable: TableEntity;
	deleteAccountingSystem: Scalars["String"];
	deleteAttr: Scalars["String"];
	deleteAttrGroup: Scalars["String"];
	deleteCategory: Scalars["String"];
	deleteCommand: Scalars["String"];
	deleteCompany: Scalars["String"];
	deleteHall: Scalars["String"];
	deleteOrder: Scalars["String"];
	deletePlace: Scalars["String"];
	deleteProduct: Scalars["String"];
	deleteShift: Scalars["String"];
	deleteTable: Scalars["String"];
	updateAccountingSystem: AccountingSystemEntity;
	updateAttr: AttributesEntity;
	updateAttrGroup: AttributesGroupEntity;
	updateCategory: CategoryEntity;
	updateCommand: CommandEntity;
	updateCompany: CompanyEntity;
	updateHall: HallEntity;
	updateOrder: ActiveOrderEntity;
	updatePlace: PlaceEntity;
	updateProduct: ProductEntity;
	updateShift: ActiveShiftEntity;
	updateTable: TableEntity;
}

export interface MutationCreateAccountingSystemArgs {
	accountingSystem: CreateAccountingSystemInput;
}

export interface MutationCreateAttrArgs {
	attr: CreateAttributeInput;
}

export interface MutationCreateAttrGroupArgs {
	attr: CreateAttributeGroupInput;
}

export interface MutationCreateCategoryArgs {
	category: CreateCategoryInput;
}

export interface MutationCreateCommandArgs {
	command: CreateCommandInput;
}

export interface MutationCreateCompanyArgs {
	company: CreateCompanyInput;
}

export interface MutationCreateHallArgs {
	hall: CreateHallInput;
}

export interface MutationCreateOrderArgs {
	order: CreateOrderInput;
}

export interface MutationCreatePlaceArgs {
	place: CreatePlaceInput;
}

export interface MutationCreateProductArgs {
	product: CreateProductInput;
}

export interface MutationCreateShiftArgs {
	shift: CreateShitInput;
}

export interface MutationCreateTableArgs {
	table: CreateTableInput;
}

export interface MutationDeleteAccountingSystemArgs {
	accountingSystemId: Scalars["String"];
}

export interface MutationDeleteAttrArgs {
	attrId: Scalars["String"];
}

export interface MutationDeleteAttrGroupArgs {
	attrGroupId: Scalars["String"];
}

export interface MutationDeleteCategoryArgs {
	categoryId: Scalars["String"];
}

export interface MutationDeleteCommandArgs {
	commandId: Scalars["String"];
}

export interface MutationDeleteCompanyArgs {
	companyId: Scalars["String"];
}

export interface MutationDeleteHallArgs {
	hallId: Scalars["String"];
}

export interface MutationDeleteOrderArgs {
	orderId: Scalars["String"];
}

export interface MutationDeletePlaceArgs {
	placeId: Scalars["String"];
}

export interface MutationDeleteProductArgs {
	productId: Scalars["String"];
}

export interface MutationDeleteShiftArgs {
	shiftId: Scalars["String"];
}

export interface MutationDeleteTableArgs {
	tableId: Scalars["String"];
}

export interface MutationUpdateAccountingSystemArgs {
	accountingSystem: UpdateAccountingSystemInput;
}

export interface MutationUpdateAttrArgs {
	attr: UpdateAttributeInput;
}

export interface MutationUpdateAttrGroupArgs {
	attrGroup: UpdateAttributeGroupInput;
}

export interface MutationUpdateCategoryArgs {
	category: UpdateCategoryInput;
}

export interface MutationUpdateCommandArgs {
	command: Scalars["String"];
}

export interface MutationUpdateCompanyArgs {
	company: UpdateCompanyInput;
}

export interface MutationUpdateHallArgs {
	hall: UpdateHallInput;
}

export interface MutationUpdateOrderArgs {
	order: UpdateOrderInput;
}

export interface MutationUpdatePlaceArgs {
	place: UpdatePlaceInput;
}

export interface MutationUpdateProductArgs {
	product: UpdateProductInput;
}

export interface MutationUpdateShiftArgs {
	shift: UpdateShitInput;
}

export interface MutationUpdateTableArgs {
	table: UpdateTableInput;
}

export enum OrderStatusEnum {
	Closed = "CLOSED",
	Opened = "OPENED"
}

export enum OrderTypeEnum {
	Delivery = "DELIVERY",
	InPlace = "IN_PLACE",
	Pickup = "PICKUP",
	Reserve = "RESERVE"
}

export interface PaginatedAccountingSystem {
	__typename?: "PaginatedAccountingSystem";
	data?: Maybe<AccountingSystemEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedActiveOrder {
	__typename?: "PaginatedActiveOrder";
	data?: Maybe<ActiveOrderEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedActiveShift {
	__typename?: "PaginatedActiveShift";
	data?: Maybe<ActiveShiftEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedAttributeGroups {
	__typename?: "PaginatedAttributeGroups";
	data?: Maybe<AttributesGroupEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedAttributes {
	__typename?: "PaginatedAttributes";
	data?: Maybe<AttributesEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCategory {
	__typename?: "PaginatedCategory";
	data?: Maybe<CategoryEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCommand {
	__typename?: "PaginatedCommand";
	data?: Maybe<CommandEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedCompany {
	__typename?: "PaginatedCompany";
	data?: Maybe<CompanyEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedHall {
	__typename?: "PaginatedHall";
	data?: Maybe<HallEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedPaymentSystem {
	__typename?: "PaginatedPaymentSystem";
	data?: Maybe<PaymentSystemEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedPlace {
	__typename?: "PaginatedPlace";
	data?: Maybe<PlaceEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedProduct {
	__typename?: "PaginatedProduct";
	data?: Maybe<ProductEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedTable {
	__typename?: "PaginatedTable";
	data?: Maybe<TableEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaginatedUser {
	__typename?: "PaginatedUser";
	data?: Maybe<UserEntity[]>;
	page: Scalars["Int"];
	totalCount: Scalars["Int"];
}

export interface PaymentSystemEntity {
	__typename?: "PaymentSystemEntity";
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface PaymentSystemEntityInput {
	name: Scalars["String"];
}

export interface PlaceEntity {
	__typename?: "PlaceEntity";
	a11y: Scalars["String"];
	address: Scalars["String"];
	attrGroups: AttributesGroupEntity[];
	categories: CategoryEntity[];
	company: CompanyEntity;
	file?: Maybe<FileEntity>;
	halls: HallEntity[];
	holidayDays: Scalars["String"];
	id: Scalars["String"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
	status: PlaceStatusEnum;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export interface PlaceEntityInput {
	a11y: Scalars["String"];
	address: Scalars["String"];
	attrGroups: AttributesGroupEntityInput[];
	categories: CategoryEntityInput[];
	company: CompanyEntityInput;
	file?: InputMaybe<FileEntityInput>;
	halls: HallEntityInput[];
	holidayDays: Scalars["String"];
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
	status: PlaceStatusEnum;
	weekDays: Scalars["String"];
	weekendDays: Scalars["String"];
}

export enum PlaceStatusEnum {
	Closed = "CLOSED",
	Opened = "OPENED"
}

export interface ProductEntity {
	__typename?: "ProductEntity";
	attrsGroups?: Maybe<AttributesGroupEntity[]>;
	category: CategoryEntity;
	description?: Maybe<Scalars["String"]>;
	file?: Maybe<FileEntity>;
	id: Scalars["String"];
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface ProductEntityInput {
	attrsGroups?: InputMaybe<AttributesGroupEntityInput[]>;
	category: CategoryEntityInput;
	description?: InputMaybe<Scalars["String"]>;
	file?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
	price: Scalars["Int"];
}

export interface Query {
	__typename?: "Query";
	accountingSystem: AccountingSystemEntity;
	accountingSystems: PaginatedAccountingSystem;
	attribute: AttributesEntity;
	attributeGroup: AttributesGroupEntity;
	attributeGroups: PaginatedAttributeGroups;
	attributes: PaginatedAttributes;
	categories: PaginatedCategory;
	category: CategoryEntity;
	command: CommandEntity;
	commands: PaginatedCommand;
	companies: PaginatedCompany;
	company: CompanyEntity;
	hall: HallEntity;
	halls: PaginatedHall;
	language: LanguageEntity;
	languages: LanguageEntity;
	order: ActiveOrderEntity;
	orders: PaginatedActiveOrder;
	payment: PaymentSystemEntity;
	payments: PaginatedPaymentSystem;
	place: PlaceEntity;
	places: PaginatedPlace;
	product: ProductEntity;
	products: PaginatedProduct;
	shift: ActiveShiftEntity;
	shifts: PaginatedActiveShift;
	table: TableEntity;
	tables: PaginatedTable;
	user: UserEntity;
	users: PaginatedUser;
}

export interface QueryAccountingSystemArgs {
	id: Scalars["String"];
}

export interface QueryAccountingSystemsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryAttributeArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupArgs {
	id: Scalars["String"];
}

export interface QueryAttributeGroupsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryAttributesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCategoriesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCategoryArgs {
	id: Scalars["String"];
}

export interface QueryCommandArgs {
	id: Scalars["String"];
}

export interface QueryCommandsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCompaniesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryCompanyArgs {
	id: Scalars["String"];
}

export interface QueryHallArgs {
	id: Scalars["String"];
}

export interface QueryHallsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryLanguageArgs {
	id: Scalars["String"];
}

export interface QueryLanguagesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryOrderArgs {
	id: Scalars["String"];
}

export interface QueryOrdersArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryPaymentArgs {
	id: Scalars["String"];
}

export interface QueryPaymentsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryPlaceArgs {
	id: Scalars["String"];
}

export interface QueryPlacesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryProductArgs {
	id: Scalars["String"];
}

export interface QueryProductsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryShiftArgs {
	id: Scalars["String"];
}

export interface QueryShiftsArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryTableArgs {
	id: Scalars["String"];
}

export interface QueryTablesArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface QueryUserArgs {
	id: Scalars["String"];
}

export interface QueryUsersArgs {
	filtersString?: InputMaybe<Scalars["String"]>;
	skip?: Scalars["Int"];
	take?: Scalars["Int"];
}

export interface TableEntity {
	__typename?: "TableEntity";
	code: Scalars["Int"];
	file: FileEntity;
	hall: HallEntity;
	id: Scalars["String"];
	name: Scalars["String"];
	orders?: Maybe<ActiveOrderEntity[]>;
}

export interface TableEntityInput {
	code: Scalars["Int"];
	file: FileEntityInput;
	hall: HallEntityInput;
	name: Scalars["String"];
	orders?: InputMaybe<ActiveOrderEntityInput[]>;
}

export enum ThemeEnum {
	Dark = "DARK",
	Light = "LIGHT"
}

export interface UpdateAccountingSystemInput {
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateAttributeGroupInput {
	id: Scalars["String"];
	isUniq: Scalars["Boolean"];
	name: Scalars["String"];
}

export interface UpdateAttributeInput {
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateCategoryInput {
	file?: InputMaybe<FileEntityInput>;
	id: Scalars["String"];
	name?: InputMaybe<Scalars["String"]>;
	place?: InputMaybe<Scalars["String"]>;
}

export interface UpdateCompanyInput {
	employees?: InputMaybe<Scalars["String"][]>;
	id: Scalars["String"];
	logo?: InputMaybe<FileEntityInput>;
	name: Scalars["String"];
}

export interface UpdateHallInput {
	file?: InputMaybe<FileEntityInput>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UpdateOrderInput {
	id: Scalars["String"];
	type: OrderTypeEnum;
}

export interface UpdatePlaceInput {
	address: Scalars["String"];
	file: FileEntityInput;
	holidayDays: WorkingHoursInput;
	id: Scalars["String"];
	name: Scalars["String"];
	weekDays: WorkingHoursInput;
	weekendDays: WorkingHoursInput;
}

export interface UpdateProductInput {
	category: Scalars["String"];
	description: Scalars["String"];
	file?: InputMaybe<FileEntityInput>;
	id: Scalars["String"];
	name: Scalars["String"];
	price: Scalars["Float"];
}

export interface UpdateShitInput {
	id: Scalars["String"];
	orders: Scalars["String"][];
	place: Scalars["String"];
	shiftDate: Scalars["String"][];
	table: Scalars["String"];
	waiter: Scalars["String"];
}

export interface UpdateTableInput {
	file?: InputMaybe<FileEntityInput>;
	id: Scalars["String"];
	name: Scalars["String"];
}

export interface UserEntity {
	__typename?: "UserEntity";
	company?: Maybe<CompanyEntity>;
	email?: Maybe<Scalars["String"]>;
	googleId?: Maybe<Scalars["String"]>;
	id: Scalars["String"];
	name: Scalars["String"];
	orders: ActiveOrderEntity[];
	password?: Maybe<Scalars["String"]>;
	role: UserRoleEnum;
	status: UserStatusEnum;
	tel?: Maybe<Scalars["String"]>;
	telegramId?: Maybe<Scalars["Int"]>;
	telegramToken?: Maybe<Scalars["String"]>;
	theme: ThemeEnum;
	verificationCode?: Maybe<Scalars["Int"]>;
}

export interface UserEntityInput {
	company?: InputMaybe<CompanyEntityInput>;
	email?: InputMaybe<Scalars["String"]>;
	googleId?: InputMaybe<Scalars["String"]>;
	name: Scalars["String"];
	orders: ActiveOrderEntityInput[];
	password?: InputMaybe<Scalars["String"]>;
	role: UserRoleEnum;
	status: UserStatusEnum;
	tel?: InputMaybe<Scalars["String"]>;
	telegramId?: InputMaybe<Scalars["Int"]>;
	telegramToken?: InputMaybe<Scalars["String"]>;
	theme: ThemeEnum;
	verificationCode?: InputMaybe<Scalars["Int"]>;
}

export enum UserRoleEnum {
	Admin = "ADMIN",
	Client = "CLIENT",
	Hookah = "HOOKAH",
	Hostess = "HOSTESS",
	Root = "ROOT",
	Waiter = "WAITER"
}

export enum UserStatusEnum {
	NotVerified = "NOT_VERIFIED",
	Verified = "VERIFIED"
}

export interface WorkingHoursInput {
	end: Scalars["Int"];
	name: Scalars["String"];
	start: Scalars["Int"];
}

export type GetAccountingSystemQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetAccountingSystemQuery {
	__typename?: "Query";
	accountingSystem: { __typename?: "AccountingSystemEntity"; id: string; name: string };
}

export type GetAccountingSystemsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetAccountingSystemsQuery {
	__typename?: "Query";
	accountingSystems: {
		__typename?: "PaginatedAccountingSystem";
		totalCount: number;
		page: number;
		data?: { __typename?: "AccountingSystemEntity"; id: string; name: string }[] | null;
	};
}

export type GetAttributesGroupQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetAttributesGroupQuery {
	__typename?: "Query";
	attributeGroup: { __typename?: "AttributesGroupEntity"; id: string; name: string };
}

export type GetAttributesGroupsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
	filtersString?: InputMaybe<Scalars["String"]>;
}>;

export interface GetAttributesGroupsQuery {
	__typename?: "Query";
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		totalCount: number;
		page: number;
		data?: { __typename?: "AttributesGroupEntity"; id: string; name: string }[] | null;
	};
}

export type GetAttributeQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetAttributeQuery {
	__typename?: "Query";
	attribute: { __typename?: "AttributesEntity"; id: string; name: string };
}

export type GetAttributesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
	filtersString?: InputMaybe<Scalars["String"]>;
}>;

export interface GetAttributesQuery {
	__typename?: "Query";
	attributes: {
		__typename?: "PaginatedAttributes";
		totalCount: number;
		page: number;
		data?: { __typename?: "AttributesEntity"; id: string; name: string }[] | null;
	};
}

export type GetCategoriesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
	filtersString?: InputMaybe<Scalars["String"]>;
}>;

export interface GetCategoriesQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "CategoryEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetCategoryQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetCategoryQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "CategoryEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetCommandQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetCommandQuery {
	__typename?: "Query";
	command: { __typename?: "CommandEntity"; id: string; name: string };
}

export type GetCommandsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetCommandsQuery {
	__typename?: "Query";
	commands: {
		__typename?: "PaginatedCommand";
		totalCount: number;
		page: number;
		data?: { __typename?: "CommandEntity"; id: string; name: string }[] | null;
	};
}

export type GetCompaniesAndPlacesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetCompaniesAndPlacesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
	places: {
		__typename?: "PaginatedPlace";
		totalCount: number;
		page: number;
		data?: { __typename?: "PlaceEntity"; id: string; name: string }[] | null;
	};
}

export type GetCompaniesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetCompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "CompanyEntity";
					id: string;
					name: string;
					logo?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetCompanyQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetCompanyQuery {
	__typename?: "Query";
	company: {
		__typename?: "CompanyEntity";
		id: string;
		name: string;
		logo?: { __typename?: "FileEntity"; url: string } | null;
	};
}

export type GetHallQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetHallQuery {
	__typename?: "Query";
	hall: {
		__typename?: "HallEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string } | null;
	};
}

export type GetHallsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetHallsQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "HallEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetOrderQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetOrderQuery {
	__typename?: "Query";
	order: { __typename?: "ActiveOrderEntity"; id: string; orderCode: string };
}

export type GetOrdersQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetOrdersQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		totalCount: number;
		page: number;
		data?: { __typename?: "ActiveOrderEntity"; id: string; orderCode: string; status: OrderStatusEnum }[] | null;
	};
}

export type GetPaymentQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetPaymentQuery {
	__typename?: "Query";
	payment: { __typename?: "PaymentSystemEntity"; id: string; name: string };
}

export type GetPaymentSystemsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetPaymentSystemsQuery {
	__typename?: "Query";
	payments: {
		__typename?: "PaginatedPaymentSystem";
		totalCount: number;
		page: number;
		data?: { __typename?: "PaymentSystemEntity"; id: string; name: string }[] | null;
	};
}

export type GetPlaceQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetPlaceQuery {
	__typename?: "Query";
	place: {
		__typename?: "PlaceEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string } | null;
	};
}

export type GetPlacesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetPlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "PlaceEntity";
					id: string;
					name: string;
					address: string;
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetProductQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetProductQuery {
	__typename?: "Query";
	product: {
		__typename?: "ProductEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string } | null;
	};
}

export type GetProductsQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetProductsQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "ProductEntity";
					id: string;
					name: string;
					price: number;
					category: { __typename?: "CategoryEntity"; name: string };
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type GetTableQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetTableQuery {
	__typename?: "Query";
	table: { __typename?: "TableEntity"; id: string; name: string; file: { __typename?: "FileEntity"; url: string } };
}

export type GetTablesQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetTablesQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		totalCount: number;
		page: number;
		data?:
			| { __typename?: "TableEntity"; id: string; name: string; file: { __typename?: "FileEntity"; url: string } }[]
			| null;
	};
}

export type GetUserQueryVariables = Exact<{
	id: Scalars["String"];
}>;

export interface GetUserQuery {
	__typename?: "Query";
	user: { __typename?: "UserEntity"; id: string; name: string };
}

export type GetUsersQueryVariables = Exact<{
	skip: Scalars["Int"];
	take: Scalars["Int"];
}>;

export interface GetUsersQuery {
	__typename?: "Query";
	users: {
		__typename?: "PaginatedUser";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "UserEntity";
					id: string;
					name: string;
					role: UserRoleEnum;
					email?: string | null;
					tel?: string | null;
					password?: string | null;
			  }[]
			| null;
	};
}

export const GetAccountingSystemDocument = gql`
	query getAccountingSystem($id: String!) {
		accountingSystem(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAccountingSystemGQL extends Apollo.Query<GetAccountingSystemQuery, GetAccountingSystemQueryVariables> {
	document = GetAccountingSystemDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetAccountingSystemsDocument = gql`
	query getAccountingSystems($skip: Int!, $take: Int!) {
		accountingSystems(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAccountingSystemsGQL extends Apollo.Query<
	GetAccountingSystemsQuery,
	GetAccountingSystemsQueryVariables
> {
	document = GetAccountingSystemsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetAttributesGroupDocument = gql`
	query getAttributesGroup($id: String!) {
		attributeGroup(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAttributesGroupGQL extends Apollo.Query<GetAttributesGroupQuery, GetAttributesGroupQueryVariables> {
	document = GetAttributesGroupDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetAttributesGroupsDocument = gql`
	query getAttributesGroups($skip: Int!, $take: Int!, $filtersString: String) {
		attributeGroups(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAttributesGroupsGQL extends Apollo.Query<GetAttributesGroupsQuery, GetAttributesGroupsQueryVariables> {
	document = GetAttributesGroupsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetAttributeDocument = gql`
	query getAttribute($id: String!) {
		attribute(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAttributeGQL extends Apollo.Query<GetAttributeQuery, GetAttributeQueryVariables> {
	document = GetAttributeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetAttributesDocument = gql`
	query getAttributes($skip: Int!, $take: Int!, $filtersString: String) {
		attributes(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAttributesGQL extends Apollo.Query<GetAttributesQuery, GetAttributesQueryVariables> {
	document = GetAttributesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCategoriesDocument = gql`
	query getCategories($skip: Int!, $take: Int!, $filtersString: String) {
		categories(skip: $skip, take: $take, filtersString: $filtersString) {
			data {
				id
				name
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCategoriesGQL extends Apollo.Query<GetCategoriesQuery, GetCategoriesQueryVariables> {
	document = GetCategoriesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCategoryDocument = gql`
	query getCategory($skip: Int!, $take: Int!) {
		categories(skip: $skip, take: $take) {
			data {
				id
				name
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCategoryGQL extends Apollo.Query<GetCategoryQuery, GetCategoryQueryVariables> {
	document = GetCategoryDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCommandDocument = gql`
	query getCommand($id: String!) {
		command(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCommandGQL extends Apollo.Query<GetCommandQuery, GetCommandQueryVariables> {
	document = GetCommandDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCommandsDocument = gql`
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

@Injectable({
	providedIn: "root"
})
export class GetCommandsGQL extends Apollo.Query<GetCommandsQuery, GetCommandsQueryVariables> {
	document = GetCommandsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCompaniesAndPlacesDocument = gql`
	query getCompaniesAndPlaces($skip: Int!, $take: Int!) {
		companies(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
		places(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCompaniesAndPlacesGQL extends Apollo.Query<
	GetCompaniesAndPlacesQuery,
	GetCompaniesAndPlacesQueryVariables
> {
	document = GetCompaniesAndPlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCompaniesDocument = gql`
	query getCompanies($skip: Int!, $take: Int!) {
		companies(skip: $skip, take: $take) {
			data {
				id
				name
				logo {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCompaniesGQL extends Apollo.Query<GetCompaniesQuery, GetCompaniesQueryVariables> {
	document = GetCompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetCompanyDocument = gql`
	query getCompany($id: String!) {
		company(id: $id) {
			id
			name
			logo {
				url
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetCompanyGQL extends Apollo.Query<GetCompanyQuery, GetCompanyQueryVariables> {
	document = GetCompanyDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetHallDocument = gql`
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

@Injectable({
	providedIn: "root"
})
export class GetHallGQL extends Apollo.Query<GetHallQuery, GetHallQueryVariables> {
	document = GetHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetHallsDocument = gql`
	query getHalls($skip: Int!, $take: Int!) {
		halls(skip: $skip, take: $take) {
			data {
				id
				name
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetHallsGQL extends Apollo.Query<GetHallsQuery, GetHallsQueryVariables> {
	document = GetHallsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetOrderDocument = gql`
	query getOrder($id: String!) {
		order(id: $id) {
			id
			orderCode
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetOrderGQL extends Apollo.Query<GetOrderQuery, GetOrderQueryVariables> {
	document = GetOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetOrdersDocument = gql`
	query getOrders($skip: Int!, $take: Int!) {
		orders(skip: $skip, take: $take) {
			data {
				id
				orderCode
				status
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetOrdersGQL extends Apollo.Query<GetOrdersQuery, GetOrdersQueryVariables> {
	document = GetOrdersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetPaymentDocument = gql`
	query getPayment($id: String!) {
		payment(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetPaymentGQL extends Apollo.Query<GetPaymentQuery, GetPaymentQueryVariables> {
	document = GetPaymentDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetPaymentSystemsDocument = gql`
	query getPaymentSystems($skip: Int!, $take: Int!) {
		payments(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetPaymentSystemsGQL extends Apollo.Query<GetPaymentSystemsQuery, GetPaymentSystemsQueryVariables> {
	document = GetPaymentSystemsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetPlaceDocument = gql`
	query getPlace($id: String!) {
		place(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetPlaceGQL extends Apollo.Query<GetPlaceQuery, GetPlaceQueryVariables> {
	document = GetPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetPlacesDocument = gql`
	query getPlaces($skip: Int!, $take: Int!) {
		places(skip: $skip, take: $take) {
			data {
				id
				name
				address
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetPlacesGQL extends Apollo.Query<GetPlacesQuery, GetPlacesQueryVariables> {
	document = GetPlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetProductDocument = gql`
	query getProduct($id: String!) {
		product(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetProductGQL extends Apollo.Query<GetProductQuery, GetProductQueryVariables> {
	document = GetProductDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetProductsDocument = gql`
	query getProducts($skip: Int!, $take: Int!) {
		products(skip: $skip, take: $take) {
			data {
				id
				name
				price
				category {
					name
				}
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetProductsGQL extends Apollo.Query<GetProductsQuery, GetProductsQueryVariables> {
	document = GetProductsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetTableDocument = gql`
	query getTable($id: String!) {
		table(id: $id) {
			id
			name
			file {
				url
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetTableGQL extends Apollo.Query<GetTableQuery, GetTableQueryVariables> {
	document = GetTableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetTablesDocument = gql`
	query getTables($skip: Int!, $take: Int!) {
		tables(skip: $skip, take: $take) {
			data {
				id
				name
				file {
					url
				}
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetTablesGQL extends Apollo.Query<GetTablesQuery, GetTablesQueryVariables> {
	document = GetTablesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetUserDocument = gql`
	query getUser($id: String!) {
		user(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
	document = GetUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetUsersDocument = gql`
	query getUsers($skip: Int!, $take: Int!) {
		users(skip: $skip, take: $take) {
			data {
				id
				name
				role
				email
				tel
				password
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetUsersGQL extends Apollo.Query<GetUsersQuery, GetUsersQueryVariables> {
	document = GetUsersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
