import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { GetUser } from 'src/decorator';
import { Roles } from 'src/decorator/role.decorator';
import { UpdateTask } from './dto';
import { RequestTask } from './dto/request-task.dto';
import { TaskService } from './task.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('')
  getAll(@GetUser() user: any) {
    return this.taskService.getAll(user);
  }
  @Post('/')
  @Roles(Role.ADMIN, Role.LEAD)
  createTask(@Body() requestTask: RequestTask) {
    return this.taskService.create(requestTask);
  }
  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.taskService.getOne(uuid);
  }

  @Get('/method/:uuid')
  getMethodBySampleId(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.taskService.getMethodBySampleId(uuid);
  }
  @Delete('/:uuid')
  @Roles(Role.ADMIN, Role.LEAD)
  deleteTask(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.taskService.deleteTask(uuid);
  }
  @Patch('/:uuid')
  updateTask(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() task: UpdateTask,
  ) {
    return this.taskService.updateTask(uuid, task);
  }
}
