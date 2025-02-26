import { Component } from '@angular/core';
import { NgFor,NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { PresentationRow, Tile } from '../models/presentation.model';

@Component({
  selector: 'app-presentation-container',
  standalone: true,
  imports: [NgFor,NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
})
export class PresentationContainerComponent {
  
  rows: PresentationRow[] = [];

  sampleText: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  addCenteredRow() {
    this.rows.push({
      type: 'centered',
      centerTiles: [],
    });
  }

  addSplitRow() {
    this.rows.push({
      type: 'split',
      leftTiles: [],
      rightTiles: [],
    });
  }

  // Helper to determine tile content based on its type
  private getTileContent(tileType: 'Text' | 'Image' | 'Map' | 'Table'): string {
    if (tileType === 'Text') {
      return this.sampleText;
    } else if (tileType === 'Map') {
      return 'assets/images/Sample_Map.png'; // adjust path as needed
    } else if (tileType === 'Image') {
      return 'assets/images/Sample_Image.jpg'; // adjust path as needed
    } else {
      return `New ${tileType}`;
    }
  }
  
  addTileToRow(
    rowIndex: number,
    position: 'center' | 'left' | 'right',
    tileType: 'Text' | 'Image' | 'Map' | 'Table'
  ) {
    const content = this.getTileContent(tileType);
    const newTile = new Tile(Date.now(), tileType, content);

    if (this.rows[rowIndex].type === 'centered' && position === 'center') {
      this.rows[rowIndex].centerTiles?.push(newTile);
    } else if (this.rows[rowIndex].type === 'split') {
      if (position === 'left') {
        this.rows[rowIndex].leftTiles?.push(newTile);
      } else if (position === 'right') {
        this.rows[rowIndex].rightTiles?.push(newTile);
      }
    }
  }

  onDragStart(event: DragEvent, tileType: 'Text' | 'Image' | 'Map' | 'Table') {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', tileType);
    }
  }

  onDrop(event: DragEvent, rowIndex: number, position: 'center' | 'left' | 'right') {
    event.preventDefault();
    if (event.dataTransfer) {
      const tileType = event.dataTransfer.getData('text/plain') as 'Text' | 'Image' | 'Map' | 'Table';
      if (tileType) {
        const content = this.getTileContent(tileType);
        const newTile = new Tile(Date.now(), tileType, content);

        // Determine insertion index based on drop position within the container
        const dropContainer = event.currentTarget as HTMLElement;
        const dropY = event.clientY;
        const children = Array.from(dropContainer.querySelectorAll('.tile'));
        let insertIndex = children.length;
        for (let i = 0; i < children.length; i++) {
          const rect = children[i].getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2;
          if (dropY < midpoint) {
            insertIndex = i;
            break;
          }
        }
        const row = this.rows[rowIndex];
        if (row.type === 'centered' && position === 'center') {
          row.centerTiles?.splice(insertIndex, 0, newTile);
        } else if (row.type === 'split') {
          if (position === 'left') {
            row.leftTiles?.splice(insertIndex, 0, newTile);
          } else if (position === 'right') {
            row.rightTiles?.splice(insertIndex, 0, newTile);
          }
        }
      }
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
