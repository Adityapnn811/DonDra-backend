import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"

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
        scale: 2
    })
    nominal: number

    @CreateDateColumn()
    transferDate: Date
}