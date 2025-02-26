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
}
