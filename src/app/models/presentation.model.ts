export type RowType = 'centered' | 'split';

export class Tile {
  constructor(
    public id: number,
    public type: 'Text' | 'Image' | 'Map' | 'Table',
    public content: string
  ) {}
}

export interface PresentationRow {
  type: RowType;
  centerTiles?: Tile[]; // Used if type is 'centered'
  leftTiles?: Tile[];   // Used if type is 'split'
  rightTiles?: Tile[];  // Used if type is 'split'
}
