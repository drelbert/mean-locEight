import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'People', content: 'TODO', cols: 2, rows: 1 },
          { title: 'Projects', content: 'TODO', cols: 1, rows: 1 },
          { title: 'Resources', content: 'TODO', cols: 1, rows: 2 },
        ];
      }
    })
  );


  constructor(private breakpointObserver: BreakpointObserver) { }

}
