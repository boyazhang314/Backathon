import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Hacker = {
  __typename?: 'Hacker';
  company: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone: Scalars['String'];
  skills?: Maybe<Array<Maybe<Skill>>>;
};

export type HackerInput = {
  company?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateHacker?: Maybe<UpdateHackerMutationResponse>;
};


export type MutationUpdateHackerArgs = {
  data: HackerInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hacker?: Maybe<Hacker>;
  hackers?: Maybe<Array<Maybe<Hacker>>>;
  skills?: Maybe<Array<Maybe<SkillAggregate>>>;
};


export type QueryHackerArgs = {
  id: Scalars['Int'];
};


export type QuerySkillsArgs = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

export type Skill = {
  __typename?: 'Skill';
  hacker?: Maybe<Hacker>;
  hackerId: Scalars['Int'];
  id: Scalars['Int'];
  rating: Scalars['Int'];
  skill: Scalars['String'];
};

export type SkillAggregate = {
  __typename?: 'SkillAggregate';
  count?: Maybe<Scalars['Int']>;
  hakers?: Maybe<Array<Maybe<Hacker>>>;
  skill?: Maybe<Scalars['String']>;
};

export type SkillInput = {
  hackerId?: InputMaybe<Scalars['Int']>;
  rating?: InputMaybe<Scalars['Int']>;
  skill?: InputMaybe<Scalars['String']>;
};

export type UpdateHackerMutationResponse = {
  __typename?: 'UpdateHackerMutationResponse';
  code: Scalars['String'];
  hacker?: Maybe<Hacker>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Hacker: ResolverTypeWrapper<Hacker>;
  HackerInput: HackerInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Skill: ResolverTypeWrapper<Skill>;
  SkillAggregate: ResolverTypeWrapper<SkillAggregate>;
  SkillInput: SkillInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateHackerMutationResponse: ResolverTypeWrapper<UpdateHackerMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Hacker: Hacker;
  HackerInput: HackerInput;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Skill: Skill;
  SkillAggregate: SkillAggregate;
  SkillInput: SkillInput;
  String: Scalars['String'];
  UpdateHackerMutationResponse: UpdateHackerMutationResponse;
};

export type HackerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hacker'] = ResolversParentTypes['Hacker']> = {
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['Skill']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateHacker?: Resolver<Maybe<ResolversTypes['UpdateHackerMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateHackerArgs, 'data' | 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hacker?: Resolver<Maybe<ResolversTypes['Hacker']>, ParentType, ContextType, RequireFields<QueryHackerArgs, 'id'>>;
  hackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hacker']>>>, ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['SkillAggregate']>>>, ParentType, ContextType, Partial<QuerySkillsArgs>>;
};

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  hacker?: Resolver<Maybe<ResolversTypes['Hacker']>, ParentType, ContextType>;
  hackerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkillAggregate'] = ResolversParentTypes['SkillAggregate']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hakers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hacker']>>>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateHackerMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateHackerMutationResponse'] = ResolversParentTypes['UpdateHackerMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hacker?: Resolver<Maybe<ResolversTypes['Hacker']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Hacker?: HackerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SkillAggregate?: SkillAggregateResolvers<ContextType>;
  UpdateHackerMutationResponse?: UpdateHackerMutationResponseResolvers<ContextType>;
};

