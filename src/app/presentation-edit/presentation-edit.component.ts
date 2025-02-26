import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PresentationContainerComponent } from '../presentation-container/presentation-container.component';

export type TileType = 'Text' | 'Image' | 'Map' | 'Table';

@Component({
  selector: 'app-presentation-edit',
  standalone: true,
  imports: [NgIf, NgFor, PresentationContainerComponent],
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss'],
})
export class PresentationEditComponent {
  selectedTab: 'layout' | 'add-content' = 'layout';
  contentItems: TileType[] = ['Text', 'Image', 'Map', 'Table'];

  selectTab(tab: 'layout' | 'add-content') {
    this.selectedTab = tab;
  }

  onDragStart(event: DragEvent, tileType: TileType) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', tileType);
    }
  }
}


