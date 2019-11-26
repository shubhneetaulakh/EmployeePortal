import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee-service/employee-create.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const employeeListServiceStub = {
  getAllEmployee() {
    return of([{ id: 1 }, { id: 2 }]);
  }
};

let employeeResponseData = [
  {
    "firstName": "debug1",
    "lastName": "debug1",
    "gender": "male",
    "department": "dep",
    "dateofbirth": "2019-11-25"
  },
  {
    "firstName": "debug1",
    "lastName": "debug1",
    "gender": "male",
    "department": "dep",
    "dateofbirth": "2019-11-25"
  }
];

@Pipe({
	name: "values"
})
export class PagenatePipeMock implements PipeTransform {
	public transform(value, args:string[]): any {
    let values = [];
		return values;
	}
}

let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let serviceEmployeeSpy: jasmine.Spy;
  let employeeService: EmployeeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent,PagenatePipeMock],
      imports: [RouterTestingModule,FormsModule,NgxPaginationModule, HttpClientTestingModule]
    }).overrideComponent(EmployeeListComponent, {
      set: {
        providers: [{ provide: EmployeeService, useValue: employeeListServiceStub }, {provide: Router, useValue: router}]
      }
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.get(EmployeeService);
    serviceEmployeeSpy = spyOn(employeeService, "getAllEmployee");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('After click on add employee button, Router navigate', () => {
    component.goToAddEmployee();
    expect(router.navigate).toHaveBeenCalledWith(['add-employee']);
  })

  it('get list of all employee, service call', (done: DoneFn) => {
    serviceEmployeeSpy.and.returnValue(of(employeeResponseData));
    employeeService.getAllEmployee().subscribe(data => {
      expect(data).toEqual(employeeResponseData);
      done();
    });
  });
});
