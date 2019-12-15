import { InputType, Field } from 'type-graphql';
import { IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';
@InputType()
export class PollInput {
    @Field()
    title: string;

    // @Field((type) => String, { nullable: true })
    // assignees?: string[];

    // @Field({ nullable: true })
    // deadline?: Date;

    @Field((type) => String)
    options: string[];
}
