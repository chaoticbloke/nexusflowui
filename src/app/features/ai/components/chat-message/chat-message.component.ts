import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChatMessage } from '../../models/chat-message';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  message = input.required<ChatMessage>();
  formattedContent = computed(() => this.formatMarkdown(this.message().content));

  private formatMarkdown(content: string): string {
    const escapeHtml = (value: string) => value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const inline = (value: string) => escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

    const lines = content.split(/\r?\n/);
    const output: string[] = [];
    let listItems: string[] = [];
    const flushList = () => {
      if (listItems.length) output.push(`<ul class="mb-3">${listItems.map((item) => `<li>${inline(item)}</li>`).join('')}</ul>`);
      listItems = [];
    };

    for (const line of lines) {
      const item = line.match(/^\s*[-*]\s+(.+)$/);
      if (item) {
        listItems.push(item[1]);
      } else {
        flushList();
        if (line.trim()) output.push(`<p class="mb-2">${inline(line)}</p>`);
      }
    }
    flushList();
    return output.join('');
  }
}
