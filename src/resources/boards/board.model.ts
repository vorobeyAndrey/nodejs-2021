import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import ColumnEntity from './column.model';

export type BoardType = {
  id?: number;
  title: string;
  columns: Array<ColumnEntity>
}

/**
 * Class representing a Board
 */
@Entity()
class Board {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, column => column.board)
  columns: Array<ColumnEntity>

  /**
   * Create a Board
   * @param {{id: string, title: string, columns: Array<Column>}} param0 first term
   */
  constructor({title = 'title', columns = []} ={} as BoardType ) {
    this.title = title;
    this.columns = columns;
  }

  /**
  *Update the board
  * @param {{title: string, columns: Array<Column>}} data first term
  */
  update(data: BoardType): void {
    const { title, columns } = data;
    this.title = title;
    if(columns && Array.isArray(columns)) {
      this.columns = columns.map(item => new ColumnEntity(item));
    }
  }
}

export default Board;