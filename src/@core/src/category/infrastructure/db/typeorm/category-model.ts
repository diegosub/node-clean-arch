
import { Column, Entity, PrimaryColumn, BaseEntity } from "typeorm";

@Entity('tb_category')
export class CategoryModel extends BaseEntity {

    @PrimaryColumn({ type: 'text' })
    id: string;

    @Column({ name: 'name', type: 'text', nullable: false })
    name: string;

    @Column({ name: 'active', type: 'boolean', nullable: false })
    active: boolean;

    @Column({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;

}