import { Injectable } from '@nestjs/common';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';

@Injectable()
export class AttendanceService {
  create(createAttendanceInput: CreateAttendanceInput) {
    return 'This action adds a new attendance';
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceInput: UpdateAttendanceInput) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
