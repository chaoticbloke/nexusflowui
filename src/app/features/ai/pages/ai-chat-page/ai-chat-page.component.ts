import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AiChatComponent } from '../../components/ai-chat/ai-chat.component';

@Component({
  selector: 'app-ai-chat-page',
  standalone: true,
  imports: [AiChatComponent],
  templateUrl: './ai-chat-page.component.html',
  styleUrl: './ai-chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatPageComponent {}
