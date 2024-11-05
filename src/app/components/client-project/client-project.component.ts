import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../services/client.service';
import {
  APIResponseModel,
  IClientProject,
  IEmployee,
} from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../../reusableComponent/alert/alert.component';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  });

  clientSrv = inject(ClientService);
  employeeList: IEmployee[] = [];
  clientList: Client[] = [];

  firstName = signal('angular 18');
  projectList = signal<IClientProject[]>([]);

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployee();
    this.getAllClientProject();
  }

  changeFname() {
    this.firstName.set('ReactJS');
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
    });
  }

  getAllClientProject() {
    this.clientSrv.getAllClientProject().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
      this.projectList.set(res.data);
    });
  }

  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv
      .addClientProjectUpdate(formValue)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Project Created Succesfully');
        } else {
          alert(res.message);
        }
      });
  }
}
