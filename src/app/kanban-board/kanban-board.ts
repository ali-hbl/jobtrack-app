import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';

export interface KanbanCard {
  id: string;
  company: string;
  role: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard {
  // Mockup data stockées dans un Signal
  board = signal<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'A postuler',
      cards: [
        { id: '1', company: 'Google', role: 'Dev Frontend' },
        { id: '2', company: 'Startup Locale', role: 'Fullstack .NET' },
      ],
    },
    {
      id: 'applied',
      title: 'Candidature envoyée',
      cards: [{ id: '3', company: 'Microsoft', role: 'Dev Angular' }],
    },
    {
      id: 'interview',
      title: 'Entretien',
      cards: [],
    },
  ]);

  // Fonction du CDK qui gère le déplacement en mémoire
  drop(event: CdkDragDrop<KanbanCard[]>) {
    if (event.previousContainer === event.container) {
      // Déplacement dans la même colonne
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Déplacement d'une colonne à une autre
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
