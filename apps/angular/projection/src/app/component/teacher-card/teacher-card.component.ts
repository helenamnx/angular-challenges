import { Component, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardButtonType } from '../../model/card-button.model';
import { CardButtonComponent } from '../card-button/card-button.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css'],
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage,
    ListItemComponent,
    NgFor,
    CardButtonComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardButtonType = CardButtonType.TEACHER;
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
  addNewItem() {
    this.store.addOne(randTeacher());
  }
}
