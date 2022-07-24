import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Moneytoring {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "numeric"
    })
    nominal: number
    
    @Column()
    isIncome: boolean

    @Column({
        default: false
    })
    isVerified: boolean

    @CreateDateColumn()
    transactionDate: Date

    @ManyToOne(() => User)
    user: User
}
