import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Role } from '../../model/Role';
import { UserDto } from '../../model/UserDto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  roles: Role[] = [Role.ADMIN, Role.USER];

  users: UserDto[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers$().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  updateUserRole(user: UserDto): void {
    this.userService.updateUserRole$(user).subscribe({
      next: (response) => {
        this.getUsers();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onRoleChange(role: any, user: UserDto): void {
    user.role = role;
  }

}
