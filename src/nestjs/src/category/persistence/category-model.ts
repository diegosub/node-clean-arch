
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tb_category')
export class CategoryModel {

    @PrimaryColumn({ type: 'text' })
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'boolean' })
    active: boolean;

    @Column({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;

}