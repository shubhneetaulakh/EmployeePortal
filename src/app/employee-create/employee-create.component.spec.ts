import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeCreateComponent } from './employee-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from '../employee-service/employee-create.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EmployeeModel } from './employee-create.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';


let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('EmployeeCreateComponent', () => {
  let component: EmployeeCreateComponent;
  let fixture: ComponentFixture<EmployeeCreateComponent>;
  let employeeService: EmployeeService;
  let httpMock: HttpTestingController;
  let serviceEmployeeSpy: jasmine.Spy;
  const dataStub: EmployeeModel = new EmployeeModel("jennifer", "model", "female", "cse", "2000-9-9");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
      declarations: [EmployeeCreateComponent], schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .overrideComponent(EmployeeCreateComponent, {
        set: {
          providers: [
            { provide: EmployeeService, useValue: { saveEmployee() { } } }, { provide: Router, useValue: router }],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.get(EmployeeService);
    serviceEmployeeSpy = spyOn(employeeService, "saveEmployee");
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toEqual(jasmine.any(EmployeeCreateComponent));
  });

  it('After click on go back to employee button, Router navigate', () => {
    component.goBackToEmployee();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  })


  it('should post the data successfully', (done: DoneFn) => {
    serviceEmployeeSpy.and.returnValue(of(dataStub));

    employeeService.saveEmployee(dataStub).subscribe((data: any) => {
      expect(data.firstName).toContain('jennifer');
      done();
    });
  });

});
