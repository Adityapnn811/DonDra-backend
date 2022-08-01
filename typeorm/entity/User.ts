import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { ColumnNumericTransformer } from "../numeric.transformer"

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nama: string

    @Column({
        unique: true
    })
    username: string

    @Column()
    password: string

    @Column({name: "fotoKTP"})
    fotoKTP: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: string

    @Column({
        default: false
    })
    isVerified: boolean

    @Column("decimal", {
        default: 0.0,
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
    })
    saldo: number

}
