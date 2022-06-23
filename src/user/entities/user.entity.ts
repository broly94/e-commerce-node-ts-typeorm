import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity ({name: "user"})
export class UserEntity extends BaseEntity {

    @Column()
    userName!: string;

    @Column({length: 50})
    name!: string;

    @Column({length: 50})
    lastName!: string;

    @Column({nullable: true})
    jobPosition!: string;

    @Column({width: 50})
    numberPhone!: number;
}