import { Method } from 'src/method/method.entity';
import { Sample } from 'src/sample/sample.entity';
import { Staff } from 'src/staff/staff.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'task_name' })
  taskName: string;

  @Column({ name: 'task_status' })
  taskStatus: string;

  @Column({ name: 'task_note' })
  taskNote: string;

  @Column({ name: 'task_result', nullable: true })
  taskResult?: string;

  @Column({ name: 'task_start_date', type: 'date' })
  taskStartDate: string;

  @Column({ name: 'task_end_date', type: 'date', nullable: true })
  taskEndDate?: string;

  @ManyToOne(() => Sample, (sample: Sample) => sample.id)
  @JoinColumn({ name: 'sample_id' })
  sample: Sample;

  @ManyToOne(() => Staff, (staff: Staff) => staff.id)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @ManyToOne(() => Method, (method: Method) => method.id)
  @JoinColumn({ name: 'method_id' })
  method: Method;
}
