import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { ColumnNumericTransformer } from "../numeric.transformer"

@Entity()
export class Moneytoring {
    @PrimaryGeneratedColumn()
    id: number

    @Column("decimal", {
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer()
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
