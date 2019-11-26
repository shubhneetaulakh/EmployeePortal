import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service/employee-create.service';
import { EmployeeModel } from '../employee-create/employee-create.model';
import { Router } from '@angular/router';

@Component({
  selector: '[app-employee-list]',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeeList();
  }
  
  employeeList: Array<EmployeeModel>;
  page: number = 1;


  getEmployeeList() {
    this.employeeService.getAllEmployee().subscribe((res) => {
      this.employeeList = res;
    });
  }

  goToAddEmployee() {
    this.router.navigate(['add-employee']);
  }
}
