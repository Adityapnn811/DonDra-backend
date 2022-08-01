import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { ColumnNumericTransformer } from "../numeric.transformer"

@Entity()
export class Transfer {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    userIDPengirim: number

    @ManyToOne(() => User)
    userIDPenerima: number

    @Column("decimal", {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
    })
    nominal: number

    @CreateDateColumn()
    transferDate: Date
}