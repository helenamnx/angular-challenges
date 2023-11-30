import { Component, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardButtonType } from '../../model/card-button.model';
import { CardButtonComponent } from '../card-button/card-button.component';
@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  styleUrls: ['./student-card.component.css'],
  imports: [CardComponent, NgOptimizedImage, CardButtonComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardButtonType = CardButtonType.STUDENT;
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
  addNewItem() {
    this.store.addOne(randStudent());
  }
}
