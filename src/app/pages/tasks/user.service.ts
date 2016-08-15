import { Injectable } from '@angular/core';
import { mockUser } from './mock-user';

@Injectable()
export class UserService {
  getMockUser() {
    return Promise.resolve(mockUser);
  }
}
