import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
