import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeFinalSubmitService } from 'src/app/app.services/employee-final-submit.service';

@Component({
  selector: 'app-final-submit',
  templateUrl: './final-submit.component.html',
  styleUrls: ['./final-submit.component.css']
})
export class FinalSubmitComponent implements OnInit 
{
  EmpID : any;
  constructor(private _service: EmployeeFinalSubmitService,private msgService: NzMessageService, private modalService: NzModalService){

  }
  ngOnInit(): void {
  //  this.EmpID = localStorage.getItem("EmpID");
  //  this.confirmAndFinalSubmit();
  }

  confirmAndFinalSubmit(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Submission',
      nzContent: 'Are you sure you want to submit?',
      nzOnOk: () => {
        this.finalSubmit();
        localStorage.clear();
      }
    });
  }
  finalSubmit()
  {
    var frmData = new FormData();
    frmData.append("EmpID",this.EmpID);

    this._service.FinalSubmit(frmData).subscribe({
      next : (res)=>{
        this.msgService.success(res.message, 
        {
          nzDuration: 3000,
        })
      },
      error :(err)=>{
        this.msgService.success(err.message, 
          {
            nzDuration: 3000,
          })
      },
    })
  }
}
