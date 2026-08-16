import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, ReactiveFormsModule],
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

  newCardForm = new FormGroup({
    company: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  // Fonction pour ajouter une carte dans le Signal
  addCard() {
    if (this.newCardForm.valid) {
      const newCard: KanbanCard = {
        id: Date.now().toString(), // faux ID temporaire
        company: this.newCardForm.value.company!,
        role: this.newCardForm.value.role!,
      };

      // met à jour le Signal
      this.board.update((currentBoard) => {
        // trouve la colonne "À postuler"
        const todoColumn = currentBoard.find((col) => col.id === 'todo');
        if (todoColumn) {
          todoColumn.cards.unshift(newCard);
        }
        return [...currentBoard];
      });
      this.newCardForm.reset();
    }
  }

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
