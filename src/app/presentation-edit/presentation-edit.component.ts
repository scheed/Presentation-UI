import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PresentationContainerComponent } from '../presentation-container/presentation-container.component';

@Component({
  selector: 'app-presentation-edit',
  standalone: true,
  imports: [NgIf, NgFor, PresentationContainerComponent],
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss'],
})
export class PresentationEditComponent {
  selectedTab: 'layout' | 'add-content' = 'layout';
  contentItems = ['Text', 'Image', 'Map', 'Table'];

  selectTab(tab: 'layout' | 'add-content') {
    this.selectedTab = tab;
  }
}
