import { Component, Input } from '@angular/core';
import { TeacherStore } from '../../data-access/teacher.store';
import { StudentStore } from '../../data-access/student.store';
import { CitiesStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import {
  randStudent,
  randTeacher,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardButtonType } from '../../model/card-button.model';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  standalone: true,
  styleUrls: ['./card-button.component.css'],
})
export class CardButtonComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() type!: CardButtonType;
  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private citiesStore: CitiesStore,
  ) {}
  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (this.type === CardType.CITY) {
      this.citiesStore.addOne(randomCity());
    }
  }
}
