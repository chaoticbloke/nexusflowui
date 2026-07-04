import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialogComponent {
  @Input() show = false;

  @Input() title = 'Confirm';

  @Input() message = 'Are you sure?';

  @Input() confirmButtonText = 'Delete';

  @Input() cancelButtonText = 'Cancel';

  @Input() confirmButtonClass = 'btn-danger';

  @Output() confirmed = new EventEmitter<void>();

  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
