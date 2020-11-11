import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "../../../client";
import { MovieCreateWithoutDirectorInput } from "../inputs/MovieCreateWithoutDirectorInput";
import { MovieUpdateWithoutDirectorInput } from "../inputs/MovieUpdateWithoutDirectorInput";
import { MovieWhereUniqueInput } from "../inputs/MovieWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MovieUpsertWithWhereUniqueWithoutDirectorInput {
  @TypeGraphQL.Field(_type => MovieWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: MovieWhereUniqueInput;

  @TypeGraphQL.Field(_type => MovieUpdateWithoutDirectorInput, {
    nullable: false,
    description: undefined
  })
  update!: MovieUpdateWithoutDirectorInput;

  @TypeGraphQL.Field(_type => MovieCreateWithoutDirectorInput, {
    nullable: false,
    description: undefined
  })
  create!: MovieCreateWithoutDirectorInput;
}
