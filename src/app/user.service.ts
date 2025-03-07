import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private nextId = 1;
  private usersSubject = new BehaviorSubject<User[]>(this.users); // Observable for real-time updates

  constructor() {}

  // Get all users as an Observable
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    user.id = this.nextId++;
    this.users.push(user);
    this.usersSubject.next([...this.users]); // Update subscribers
    return new BehaviorSubject(user).asObservable();
  }

  // Update an existing user
  updateUser(updatedUser: User): Observable<User> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next([...this.users]); // Update subscribers
      return new BehaviorSubject(updatedUser).asObservable();
    }
    return new BehaviorSubject(null!).asObservable();
  }

  // Delete a user
  deleteUser(userId: number): Observable<boolean> {
    this.users = this.users.filter(user => user.id !== userId);
    this.usersSubject.next([...this.users]); // Update subscribers
    return new BehaviorSubject(true).asObservable();
  }
}
