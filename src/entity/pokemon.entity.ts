import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'pokemon'})
export class Pokemon {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    attack: number;

    @Column()
    defense: number;

    @Column()
    hp: number;

    @Column()
    speed: number;

    @Column()
    type: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}