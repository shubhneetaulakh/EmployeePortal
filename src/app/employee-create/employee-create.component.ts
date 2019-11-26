import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee-create.model';
import { EmployeeService } from '../employee-service/employee-create.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: '[app-employee-create]',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  empModel: EmployeeModel;
  gender: String;
  isNameEmpty: Boolean = false;
   minDate: Date = new Date("01/01/1970");
   maxDate: Date = new Date();
   dateValue: Date;
   date : String;


  addEmployee(fname, lname, dep) {
    debugger;
    if (fname.value == "" || lname.value == "") {
      this.isNameEmpty = true;
    }
    else {
       this.date = this.dateValue.getFullYear() + "-" + this.dateValue.getMonth() + "-" + this.dateValue.getDate();
      this.empModel = new EmployeeModel(fname.value, lname.value, this.gender, dep.value, this.date.toString());
      this.employeeService.saveEmployee(this.empModel).subscribe((res) => {
        console.log("employee is created");
        this.router.navigate(['']);
      });
    }
  }

  goBackToEmployee() {
    this.router.navigate(['']);
  }
}
