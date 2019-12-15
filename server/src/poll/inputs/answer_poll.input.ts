import { InputType, Field } from 'type-graphql';
import { IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';
@InputType()
export class AnswerPollInput {
    @Field()
    _id: string;

    @Field((type) => String)
    optionId: string;
}
