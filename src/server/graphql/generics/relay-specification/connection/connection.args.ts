import { CannotWith } from "@/server/graphql/validators/cannotWith.validator";
import { EitherOr } from "@/server/graphql/validators/eitherOr.validator";
import { Max, Min } from "class-validator";
import { ConnectionArguments as RelayConnectionArguments } from "graphql-relay";
import { ArgsType, Field, Int } from "type-graphql";
import type { ConnectionCursor } from "graphql-relay";

// TODO: validate must provide at least first or last
@ArgsType()
export class ConnectionArguments implements RelayConnectionArguments {
  @CannotWith(["after", "first"])
  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come before the specified cursor.",
  })
  before?: ConnectionCursor;

  @CannotWith(["before", "last"])
  @Field(() => String, {
    nullable: true,
    description:
      "Returns the elements in the list that come after the specified cursor.",
  })
  after?: ConnectionCursor;

  @EitherOr("last")
  @CannotWith(["before", "last"])
  @Min(1)
  @Max(20)
  @Field(() => Int, {
    nullable: true,
    description: "Returns the first _n_ elements from the list.",
  })
  first?: number;

  @EitherOr("first")
  @Min(1)
  @Max(20)
  @CannotWith(["after", "first"])
  @Field(() => Int, {
    nullable: true,
    description: "Returns the last _n_ elements from the list.",
  })
  last?: number;
}
