import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { AiChatService } from '../../services/ai-chat.service';
import { ChatMessage } from '../../models/chat-message';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [ChatInputComponent, ChatMessageComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatComponent {
  private readonly aiChat = inject(AiChatService);
  private readonly conversationId = crypto.randomUUID();
  @ViewChild('messageList') private messageList?: ElementRef<HTMLElement>;

  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal('');

  sendMessage(content: string) {
    if (this.loading()) return;
    this.error.set('');
    this.messages.update((messages) => [...messages, { role: 'USER', content }]);
    this.loading.set(true);
    this.scrollToLatest();

    this.aiChat.chat({ conversationId: this.conversationId, message: content })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ message }) => {
          this.messages.update((messages) => [...messages, { role: 'ASSISTANT', content: message }]);
          this.scrollToLatest();
        },
        error: () => this.error.set('We couldn’t reach NexusFlow AI. Check your connection and try again.'),
      });
  }

  private scrollToLatest() {
    requestAnimationFrame(() => {
      const list = this.messageList?.nativeElement;
      if (list) list.scrollTop = list.scrollHeight;
    });
  }
}
