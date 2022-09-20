import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  createAttendance(@Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput) {
    return this.attendanceService.create(createAttendanceInput);
  }

  @Query(() => [Attendance], { name: 'attendance' })
  findAll() {
    return this.attendanceService.findAll();
  }

  @Query(() => Attendance, { name: 'attendance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attendanceService.findOne(id);
  }

  @Mutation(() => Attendance)
  updateAttendance(@Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput) {
    return this.attendanceService.update(updateAttendanceInput.id, updateAttendanceInput);
  }

  @Mutation(() => Attendance)
  removeAttendance(@Args('id', { type: () => Int }) id: number) {
    return this.attendanceService.remove(id);
  }
}
