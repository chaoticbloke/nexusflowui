import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  sendMessage = output<string>();
  disabled = input(false);
  message = '';

  submit() {
    const content = this.message.trim();
    if (!content || this.disabled()) return;
    this.sendMessage.emit(content);
    this.message = '';
  }
}
