import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PresentationRow, Tile } from '../models/presentation.model';

@Component({
  selector: 'app-presentation-container',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
})
export class PresentationContainerComponent {
  rows: PresentationRow[] = [];

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

  addTileToRow(rowIndex: number, position: 'center' | 'left' | 'right', tileType: 'Text' | 'Image' | 'Map' | 'Table') {
    const newTile = new Tile(Date.now(), tileType, `New ${tileType}`);

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
        const newTile = new Tile(Date.now(), tileType, `New ${tileType}`);
        const row = this.rows[rowIndex];

        if (row.type === 'centered' && position === 'center') {
          row.centerTiles?.push(newTile);
        } else if (row.type === 'split') {
          if (position === 'left') {
            row.leftTiles?.push(newTile);
          } else if (position === 'right') {
            row.rightTiles?.push(newTile);
          }
        }
      }
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
