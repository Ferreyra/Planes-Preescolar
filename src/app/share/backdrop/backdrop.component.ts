import { Component, ViewChild } from '@angular/core';
import { apredizajes } from './example-data';
import { MatAccordion } from '@angular/material/expansion';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent {
  public displayMode: 'default' | 'flat' = 'flat';
  constructor() {}

  // @ViewChild(MatAccordion) accordion: MatAccordion;

}
