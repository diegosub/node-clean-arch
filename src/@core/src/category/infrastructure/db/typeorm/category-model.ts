
import { Column, Entity, PrimaryColumn, BaseEntity } from "typeorm";

@Entity('tb_category')
export class CategoryModel {

    @PrimaryColumn({ type: 'text' })
    id: string;

    @Column({ name: 'name', type: 'text', nullable: false })
    name: string;

    @Column({ name: 'active', type: 'boolean', nullable: false })
    active: boolean;

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', nullable: false })
    updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

}