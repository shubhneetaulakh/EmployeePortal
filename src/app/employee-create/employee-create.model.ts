export class EmployeeModel {
    public firstName: String;
    public lastName: String;
    public gender: String;
    public department: String;
    public dateofbirth: String;

    constructor(firstName: String, lastName: String, gender: String, department: String, dob: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.department = department;
        this.dateofbirth = dob;
    }
}