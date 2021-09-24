import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DetailService } from 'src/app/_services/detail.service';
import {
  FormGroup,FormControl,Validators,FormBuilder
} from '@angular/forms';
import { Employee } from 'src/app/_services/employee.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: Employee;
  form: FormGroup;
  constructor(public service: DetailService, private fb: FormBuilder) { }

  ngOnInit() {
    this.resetForm(this.form);
    this.form = this.fb.group(
      {
        EmployeeName:[''],
        Technology:[''],
        Password:['']
      }
    )
  }


  resetForm(form) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      EmployeeId: 0,
      EmployeeName: '',
      Technology: '',
      Password:''
    }
  }

  onSubmit(form) {
    if (this.service.formData.EmployeeId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form) {
    this.user = Object.assign({}, this.form.value);
    this.service.postDetail(this.user).subscribe(
      res => {
        
        this.resetForm(form);
      
        this.service.refreshList();
      },
      err => {
        
        console.log(err);
      }
    )
  }
  updateRecord(form) {
    this.user = Object.assign({}, this.form.value);
    this.service.putDetail(this.user).subscribe(
      res => {
        this.resetForm(form);
       alert('Submitted successfully');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
