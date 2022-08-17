import { IsBoolean } from 'class-validator';
import { Lab } from 'src/lab/lab.entity';
import { Staff } from 'src/staff/staff.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('staff_lab')
export class StaffLab {
  @PrimaryColumn()
  staff_id: string;

  @PrimaryColumn()
  lab_id: string;

  @ManyToOne(() => Staff, (staff: Staff) => staff.id)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @ManyToOne(() => Lab, (lab: Lab) => lab.id)
  @JoinColumn({ name: 'lab_id' })
  lab: Lab;

  @Column({ name: 'is_lead' })
  @IsBoolean()
  isLead: boolean;
}
