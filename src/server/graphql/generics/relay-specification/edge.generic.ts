import {  Edge } from 'graphql-relay';
import { ClassType, Field, ObjectType } from 'type-graphql';
import type { ConnectionCursor } from "graphql-relay";

export function EdgeType<N>(NodeType: ClassType<N>) {
  @ObjectType({ isAbstract: true })
  abstract class EdgeClass implements Edge<N> {
    @Field(() => NodeType, {
      description: 'The item at the end of the edge.',
    })
    readonly node!: N;

    @Field(() => String, { description: 'A cursor for use in pagination.' })
    readonly cursor!: ConnectionCursor;
  }

  return EdgeClass;
}
