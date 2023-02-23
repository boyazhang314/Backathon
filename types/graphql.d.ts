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

/** Event represents any workshop or activity that occurs during the Hackathon */
export type Event = {
  __typename?: 'Event';
  /** Attendees are all Hackers that have gone to the Event */
  attendees?: Maybe<Array<Maybe<Hacker>>>;
  /** Event is the name of the event */
  event: Scalars['String'];
  /** ID is a unique identifier for each event which automatically increments */
  id: Scalars['Int'];
};

/** Hacker represents a participant in the Hackathon */
export type Hacker = {
  __typename?: 'Hacker';
  /** Attended are all Events that the Hacker has gone to */
  attended?: Maybe<Array<Maybe<Event>>>;
  /** Company of the Hacker */
  company: Scalars['String'];
  /** Email of the Hacker */
  email: Scalars['String'];
  /** ID is a unique identifier for each hacker which automatically increments */
  id: Scalars['Int'];
  /** Name of the Hacker */
  name: Scalars['String'];
  /** Phone number of the Hacker */
  phone: Scalars['String'];
  /** Registered represents if the Hacker was successfully registered for the Hackathon */
  registered: Scalars['Boolean'];
  /** Skills are all skills the Hacker has */
  skills?: Maybe<Array<Maybe<Skill>>>;
};

/** HackerInput represents data of a Hacker for a Mutation */
export type HackerInput = {
  /** Company of the Hacker */
  company?: InputMaybe<Scalars['String']>;
  /** Email of the Hacker */
  email?: InputMaybe<Scalars['String']>;
  /** Name of the Hacker */
  name?: InputMaybe<Scalars['String']>;
  /** Phone number of the Hacker */
  phone?: InputMaybe<Scalars['String']>;
  /** Registered represents if the Hacker was successfully registered for the Hackathon */
  registered?: InputMaybe<Scalars['Boolean']>;
  /** Skills are all skills the Hacker has */
  skills?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

/** Mutation type for manipulating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Insert using IDs a log of a Hacker attending an Event */
  eventAttended?: Maybe<MutationResponse>;
  /** Update a Hacker by flagging them as registered */
  registerHacker?: Maybe<MutationResponse>;
  /** Update a Hacker with new data and possibly add skills */
  updateHacker?: Maybe<MutationResponse>;
};


/** Mutation type for manipulating data */
export type MutationEventAttendedArgs = {
  eventId: Scalars['Int'];
  hackerId: Scalars['Int'];
};


/** Mutation type for manipulating data */
export type MutationRegisterHackerArgs = {
  id: Scalars['Int'];
};


/** Mutation type for manipulating data */
export type MutationUpdateHackerArgs = {
  data: HackerInput;
  id: Scalars['Int'];
};

/**
 * "
 * MutationResponse is the data returned after a Mutation
 */
export type MutationResponse = {
  __typename?: 'MutationResponse';
  /** Code is the success code of the operation */
  code: Scalars['String'];
  /** Hacker which was mutated */
  hacker?: Maybe<Hacker>;
  /** Message is the response message */
  message: Scalars['String'];
  /** Success represents whether or not the mutation was successful */
  success: Scalars['Boolean'];
};

/** Query type for selecting and viewing data */
export type Query = {
  __typename?: 'Query';
  /** Query all events */
  events?: Maybe<Array<Maybe<Event>>>;
  /** Query a specific Hacker with their unique ID */
  hacker?: Maybe<Hacker>;
  /** Query all Hackers, can filter with a specified skill and a specified skill rating */
  hackers?: Maybe<Array<Maybe<Hacker>>>;
  /** Query a specific Skill with its unique ID */
  skill?: Maybe<SkillAggregate>;
  /** Query all Skills, can filter with a range for the frequency */
  skills?: Maybe<Array<Maybe<SkillAggregate>>>;
};


/** Query type for selecting and viewing data */
export type QueryHackerArgs = {
  id: Scalars['Int'];
};


/** Query type for selecting and viewing data */
export type QueryHackersArgs = {
  rating?: InputMaybe<Scalars['Int']>;
  skill?: InputMaybe<Scalars['String']>;
};


/** Query type for selecting and viewing data */
export type QuerySkillArgs = {
  id: Scalars['Int'];
};


/** Query type for selecting and viewing data */
export type QuerySkillsArgs = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

/** Skill represents an ability and its proficiency of a Hacker */
export type Skill = {
  __typename?: 'Skill';
  /** Hacker is the one with this Skill */
  hacker?: Maybe<Hacker>;
  /** HackerID is the ID of the Hacker with this Skill */
  hackerId: Scalars['Int'];
  /** ID is a unique identifier for each skill which automatically increments */
  id: Scalars['Int'];
  /** Rating is a numerical indication of the level of proficiency */
  rating: Scalars['Int'];
  /** Skill is the name of the actual skill */
  skill: Scalars['String'];
};

/** SkillAggregate provides an aggregate view of a skill */
export type SkillAggregate = {
  __typename?: 'SkillAggregate';
  /** Count is the number of hackers with this skill */
  count?: Maybe<Scalars['Int']>;
  /** Hackers are all hackers with this skill */
  hackers?: Maybe<Array<Maybe<Hacker>>>;
  /** Skill is the name of the actual skill */
  skill?: Maybe<Scalars['String']>;
};

/** SkillInput represents data of a Skill for a Mutation */
export type SkillInput = {
  /** HackerID is the ID of the Hacker with this Skill */
  hackerId?: InputMaybe<Scalars['Int']>;
  /** Rating is a numerical indication of the level of proficiency */
  rating: Scalars['Int'];
  /** Skill is the name of the actual skill */
  skill: Scalars['String'];
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
  Event: ResolverTypeWrapper<Event>;
  Hacker: ResolverTypeWrapper<Hacker>;
  HackerInput: HackerInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  Skill: ResolverTypeWrapper<Skill>;
  SkillAggregate: ResolverTypeWrapper<SkillAggregate>;
  SkillInput: SkillInput;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Event: Event;
  Hacker: Hacker;
  HackerInput: HackerInput;
  Int: Scalars['Int'];
  Mutation: {};
  MutationResponse: MutationResponse;
  Query: {};
  Skill: Skill;
  SkillAggregate: SkillAggregate;
  SkillInput: SkillInput;
  String: Scalars['String'];
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  attendees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hacker']>>>, ParentType, ContextType>;
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HackerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hacker'] = ResolversParentTypes['Hacker']> = {
  attended?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registered?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skills?: Resolver<Maybe<Array<Maybe<ResolversTypes['Skill']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  eventAttended?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationEventAttendedArgs, 'eventId' | 'hackerId'>>;
  registerHacker?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationRegisterHackerArgs, 'id'>>;
  updateHacker?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateHackerArgs, 'data' | 'id'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hacker?: Resolver<Maybe<ResolversTypes['Hacker']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  hacker?: Resolver<Maybe<ResolversTypes['Hacker']>, ParentType, ContextType, RequireFields<QueryHackerArgs, 'id'>>;
  hackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hacker']>>>, ParentType, ContextType, Partial<QueryHackersArgs>>;
  skill?: Resolver<Maybe<ResolversTypes['SkillAggregate']>, ParentType, ContextType, RequireFields<QuerySkillArgs, 'id'>>;
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
  hackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hacker']>>>, ParentType, ContextType>;
  skill?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Event?: EventResolvers<ContextType>;
  Hacker?: HackerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SkillAggregate?: SkillAggregateResolvers<ContextType>;
};

