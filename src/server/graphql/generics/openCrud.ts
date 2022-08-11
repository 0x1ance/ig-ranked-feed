import { ArgsType, ClassType, Field } from 'type-graphql';

export function CreateEntityArgs<CreateInputType>(input: ClassType<CreateInputType>) {
  @ArgsType()
  abstract class CreateEntityArgs {
    @Field(type => input)
    data: CreateInputType;
  }
  return CreateEntityArgs;
}
