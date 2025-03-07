import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [FormsModule]  // ✅ Import FormsModule here
})
export class UserFormComponent {
  @Input() userToEdit: any;
  @Output() userAdded = new EventEmitter();

  user = { id: 0, name: '', email: '', phone: '' };

  saveUser() {
    this.userAdded.emit(this.user);
    this.user = { id: 0, name: '', email: '', phone: '' }; // Reset form
  }
}
