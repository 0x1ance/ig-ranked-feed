import { ConnectionType } from '@/server/graphql/generics';
import { EdgeType } from '@/server/graphql/generics';
import { Post } from '@/server/graphql/types/entities';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class PostEdge extends EdgeType(Post) {}

@ObjectType()
export class PostConnection extends ConnectionType(PostEdge) {}
