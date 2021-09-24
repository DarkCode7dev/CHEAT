import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailService } from 'src/app/_services/detail.service';
import { Employee } from 'src/app/_services/employee.model';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent implements OnInit {

  
  constructor(public service: DetailService,private fb: FormBuilder) { }
  p: number = 1;
  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: Employee) {
    this.service.formData = Object.assign({}, pd);
   
  }

  onDelete(EmployeeId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteDetail(EmployeeId)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          alert('Deleted successfully');
        },
          err => {
            
            console.log(err);
          })
    }
  }

}
