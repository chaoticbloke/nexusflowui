import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AiChatComponent } from '../../ai/components/ai-chat/ai-chat.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AiChatComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  chatOpen = signal(false);
  chatInitialized = signal(false);

  toggleChat() {
    const open = !this.chatOpen();
    this.chatOpen.set(open);
    if (open) this.chatInitialized.set(true);
  }
}
