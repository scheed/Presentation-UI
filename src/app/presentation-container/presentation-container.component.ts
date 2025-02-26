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
  draggedTile: { rowIndex: number; position: 'center' | 'left' | 'right'; tile: Tile; tileIndex: number } | null = null;


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
  
    private getTileContent(tileType: 'Text' | 'Image' | 'Map' | 'Table'): string {
      if (tileType === 'Text') {
        return this.sampleText;
      } else if (tileType === 'Map') {
        return 'assets/images/Sample_Map.png';
      } else if (tileType === 'Image') {
        return 'assets/images/Sample_Image.jpg';
      } else {
        return `New ${tileType}`;
      }
    }
  
    // For adding a new tile from the palette (unchanged)
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
        // Mark this as a new tile drag (from palette)
        event.dataTransfer.setData('text/plain', tileType);
      }
    }
  
    // New handler for dragging an existing tile
    tileDragStart(
      event: DragEvent,
      rowIndex: number,
      position: 'center' | 'left' | 'right',
      tileIndex: number,
      tile: Tile
    ) {
      this.draggedTile = { rowIndex, position, tile, tileIndex };
      if (event.dataTransfer) {
        // Optionally set a marker to indicate this is a reorder drag
        event.dataTransfer.setData('text/plain', 'reorder');
      }
    }
  
    // Updated onDrop handler for both new tile addition and reordering
    onDrop(event: DragEvent, rowIndex: number, position: 'center' | 'left' | 'right') {
      event.preventDefault();
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
    
      if (this.draggedTile) {
        // Handle reordering an existing tile
        const { rowIndex: originRow, position: originPos, tile, tileIndex } = this.draggedTile;
        if (originPos === 'center') {
          this.rows[originRow].centerTiles!.splice(tileIndex, 1);
        } else if (originPos === 'left') {
          this.rows[originRow].leftTiles!.splice(tileIndex, 1);
        } else if (originPos === 'right') {
          this.rows[originRow].rightTiles!.splice(tileIndex, 1);
        }
        if (originRow === rowIndex && originPos === position && tileIndex < insertIndex) {
          insertIndex--;
        }
        if (this.rows[rowIndex].type === 'centered' && position === 'center') {
          this.rows[rowIndex].centerTiles!.splice(insertIndex, 0, tile);
        } else if (this.rows[rowIndex].type === 'split') {
          if (position === 'left') {
            this.rows[rowIndex].leftTiles!.splice(insertIndex, 0, tile);
          } else if (position === 'right') {
            this.rows[rowIndex].rightTiles!.splice(insertIndex, 0, tile);
          }
        }
        this.draggedTile = null;
      } else if (event.dataTransfer) {
        // First, get the raw data string
        const rawTileType = event.dataTransfer.getData('text/plain');
        // Only proceed if it's not a reorder drag
        if (rawTileType && rawTileType !== 'reorder') {
          const tileType = rawTileType as 'Text' | 'Image' | 'Map' | 'Table';
          const content = this.getTileContent(tileType);
          const newTile = new Tile(Date.now(), tileType, content);
          if (this.rows[rowIndex].type === 'centered' && position === 'center') {
            this.rows[rowIndex].centerTiles!.splice(insertIndex, 0, newTile);
          } else if (this.rows[rowIndex].type === 'split') {
            if (position === 'left') {
              this.rows[rowIndex].leftTiles!.splice(insertIndex, 0, newTile);
            } else if (position === 'right') {
              this.rows[rowIndex].rightTiles!.splice(insertIndex, 0, newTile);
            }
          }
        }
      }
    }
    
  
    allowDrop(event: DragEvent) {
      event.preventDefault();
    }
}
