import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdleActivityService } from './shared/services/idle-activity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styles: [],
})
export class App implements OnInit {
  idleActivityService = inject(IdleActivityService);
  ngOnInit(): void {
    //this.idleActivityService.startWatching();
  }
}
