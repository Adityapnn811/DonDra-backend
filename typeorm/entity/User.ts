import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"

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

    @Column({
        default: 0,
        type: "numeric"
    })
    saldo: number

}
