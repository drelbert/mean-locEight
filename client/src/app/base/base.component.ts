import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';



export interface Card {
  cols: number;
  rows: number;
  title: string;
  content: {
    name: string;
    project: string;
};


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  cards: Card[] = [
          {
            title: 'People',
            content:
            {
              name: ['Lars', 'Mack', 'Tito'],
              project: 'Sod Install 2912',
            },
            cols: 2,
            rows: 1 },



          { title: 'Projects', content: 'TODO', cols: 1, rows: 1 },
          { title: 'Resources', content: 'TODO', cols: 1, rows: 2 },
        ];
      }


