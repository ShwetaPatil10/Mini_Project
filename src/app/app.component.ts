import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule]  // ✅ Import FormsModule and CommonModule
})
export class AppComponent {
  users: User[] = [];
  user: User = { id: 0, name: '', email: '', phone: '' };
  editing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser() {
    if (this.editing) {
      this.userService.updateUser(this.user).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User) {
    this.user = { ...user };  // Clone to prevent direct modification
    this.editing = true;
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
  }

  resetForm() {
    this.user = { id: 0, name: '', email: '', phone: '' };
    this.editing = false;
  }
}
