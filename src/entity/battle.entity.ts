import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'battle'})
export class Battle {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    challenger_id: string;

    @Column()
    opponent_id: string;

    @Column()
    winner: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}