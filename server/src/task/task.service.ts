import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Method } from 'src/method/method.entity';
import { Status } from 'src/sample/dto/status.enum';
import { Sample } from 'src/sample/sample.entity';
import { Staff } from 'src/staff/staff.entity';
import { StaffLab } from 'src/staffLab/staffLab.entity';
import { Repository } from 'typeorm';
import { UpdateTask } from './dto';
import { RequestTask } from './dto/request-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,

    @Inject('STAFF_REPOSITORY')
    private staffRepository: Repository<Staff>,

    @Inject('STAFF_LAB_REPOSITORY')
    private stafLabRepository: Repository<StaffLab>,

    @Inject('SAMPLE_REPOSITORY')
    private sampleRepository: Repository<Sample>,

    @Inject('METHOD_REPOSITORY')
    private methodRepository: Repository<Method>,
  ) {}

  async getAll(user): Promise<Task[]> {
    if (user.isManager) {
      return await this.taskRepository.find({
        relations: {
          staff: true,
          sample: true,
          method: true,
        },
      });
    } else if (user.isLead) {
      const labList = await this.stafLabRepository.find({
        where: {
          staff_id: user.id,
        },
        relations: {
          lab: true,
        },
      });
      let samples: any = [];
      for (const lab of labList) {
        const sampleInLab = await this.sampleRepository.find({
          where: {
            lab: lab.lab,
          },
          relations: {
            lab: true,
          },
        });
        samples = [...samples, ...sampleInLab];
      }
      let tasks = [];
      for (const sample of samples) {
        const taskInSample = await this.taskRepository.find({
          where: {
            sample: sample,
          },
          relations: {
            sample: true,
            staff: true,
            method: true,
          },
        });
        tasks = [...tasks, ...taskInSample];
      }
      return tasks;
    }
    const staff = await this.staffRepository.findOne({
      where: {
        id: user.id,
      },
    });
    return await this.taskRepository.find({
      where: {
        staff: staff,
      },
      relations: {
        staff: true,
        sample: true,
        method: true,
      },
    });
  }

  async create(taskRequest: RequestTask): Promise<Task> {
    const sample = await this.sampleRepository.findOne({
      where: {
        id: taskRequest.sampleId,
      },
    });
    if (!sample) {
      throw new NotFoundException('Sample id is not exist');
    }

    const method = await this.methodRepository.findOneBy({
      id: taskRequest.methodId,
    });
    if (!method) {
      throw new NotFoundException('Method id is not exist');
    }
    const taskStartDate = new Date();
    const newTask: Task = {
      taskStatus: Status.TO_DO,
      taskNote: taskRequest.taskNote,
      taskResult: null,
      taskStartDate: taskStartDate.toISOString().slice(0, 10),
      taskEndDate: null,
      sample: sample,
      staff: null,
      taskName: taskRequest.taskName,
      method: method,
    };
    if (sample.sampleStatus == Status.DONE) {
      await this.sampleRepository.save({
        ...sample,
        sampleStatus: Status.PROCCESSING,
      });
    }
    return this.taskRepository.save(newTask);
  }

  async getOne(uuid: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: uuid },
      relations: {
        staff: true,
        method: true,
        sample: true,
      },
    });
    if (!task) {
      throw new NotFoundException('Task id is not exist');
    }
    return task;
  }

  async getMethodBySampleId(uuid: string): Promise<Method[]> {
    const sample = await this.sampleRepository.findOneBy({
      id: uuid,
    });
    const task = await this.taskRepository.find({
      where: { sample: sample },
      relations: {
        method: true,
      },
    });
    if (!task) {
      throw new NotFoundException('Task id is not exist');
    }
    const methodList = task.map((task) => ({
      ...task.method,
      taskId: task.id,
      taskStatus: task.taskStatus,
    }));
    return methodList;
  }

  async updateTask(uuid: string, updatedTask: UpdateTask): Promise<Task> {
    const staff = await this.staffRepository.findOne({
      where: { id: updatedTask.staffId },
    });
    if (!staff) {
      throw new NotFoundException('Staff id is not exist');
    }

    const method = await this.methodRepository.findOneBy({
      id: updatedTask.methodId,
    });
    if (!method) {
      throw new NotFoundException('Method id is not exist');
    }
    const taskFound = await this.getOne(uuid);

    let taskEndDate: string;
    if (updatedTask.taskStatus == Status.DONE) {
      taskEndDate = new Date().toISOString().slice(0, 10);
    } else if (!updatedTask.taskStatus) {
      taskEndDate = taskFound.taskEndDate;
    } else {
      taskEndDate = null;
    }

    const task = {
      taskStatus: updatedTask.taskStatus || taskFound.taskStatus,
      taskNote: updatedTask.taskNote || taskFound.taskNote,
      taskResult: updatedTask.taskResult || taskFound.taskResult,
      taskStartDate: updatedTask.taskStartDate || taskFound.taskStartDate,
      taskEndDate: taskEndDate,
      sampleId: taskFound.sample.id,
      method: method,
      staff: staff,
      taskName: updatedTask.taskName || taskFound.taskName,
      id: uuid,
    };

    const addedTask = await this.taskRepository.save(task);
    const taskBySample = await this.taskRepository.find({
      where: {
        sample: taskFound.sample,
      },
    });
    const sampleStatus = taskBySample.some(
      (task) => task.taskStatus != Status.DONE,
    );
    const sampleFound = taskFound.sample;
    if (sampleStatus) {
      await this.sampleRepository.save({
        ...sampleFound,
        sampleStatus: Status.PROCCESSING,
      });
    }
    return addedTask;
  }

  async deleteTask(uuid: string) {
    const task = await this.getOne(uuid);
    await this.taskRepository.delete(task.id);
    return { msg: 'Sucessfully deleted task' };
  }
}
