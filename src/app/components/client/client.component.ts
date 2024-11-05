import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { observable, Observable } from 'rxjs';
import { Constant } from '../../constant/Constant';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  consRequired = Constant.VALIDATION_MESSAGE.REQUIRED;
  currentDate: Date = new Date();

  clientObj: Client = new Client();
  clientList: any[] = [];
  testList: any[] = [];

  http = inject(HttpClient);
  clientService = inject(ClientService);

  userList$: Observable<any> = new Observable<any>();

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUser();
  }

  // loadClient() {
  //   this.http
  //     .get<any>('https://localhost:7294/api/v1/EmployeeConroller')
  //     .subscribe((res: any) => {
  //       this.testList = res;
  //       console.log(this.testList);
  //     });
  // }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveClient() {
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client Created success!');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.clientService
        .deleteClientById(id)
        .subscribe((res: APIResponseModel) => {
          if (res.result) {
            alert('Client Deleted success!');
            this.loadClient();
            this.clientObj = new Client();
          } else {
            alert(res.message);
          }
        });
    } else {
    }
  }
}
