import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../employee-create/employee-create.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private httpService: HttpClient) {
    }

    public getAllEmployee(): Observable<EmployeeModel[]> {
        return this.httpService.get<EmployeeModel[]>('http://localhost:8080/employee/details');
    }

    public saveEmployee(empModel: EmployeeModel) {
        return this.httpService.post('http://localhost:8080/employee/details', empModel);
    }
}