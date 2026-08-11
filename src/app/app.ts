import { Component, signal } from '@angular/core';
import { KanbanBoard } from './kanban-board/kanban-board';

@Component({
  selector: 'app-root',
  imports: [KanbanBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('stagetrack-app');
}
