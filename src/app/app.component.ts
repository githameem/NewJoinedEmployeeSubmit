import { Component,Renderer2, ElementRef, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeFinalSubmitService } from './app.services/employee-final-submit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit 
{
  tabDiabled= false;
  title = 'NewJoinedEmployee';
  key = localStorage.getItem("EmoCode");
  EmpID : any;
  isfinalSubmit = false;
  showFinalSubmitedPage = false;
  constructor(private router: Router,private renderer: Renderer2, 
    private elementRef: ElementRef, 
    private msgService : NzMessageService, 
    private modalService: NzModalService,
    private _service: EmployeeFinalSubmitService,
    private finalSubmitservice: EmployeeFinalSubmitService
     ) {}
  ngOnInit(): void 
  {
    this.EmpID = localStorage.getItem("EmpID");
    var finalSubmit = localStorage.getItem("FInalSubmit");
    if (finalSubmit == "true") {
      this.tabDiabled= true;
    }
    this.getFinalSubmit();
  }
   
  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
  ClearStorage(){
    localStorage.clear();
    this.msgService.info('Refreshed!', { nzDuration: 2500 }).onClose!;
  }
  FinalSubmit(){
    this.modalService.confirm({
      nzTitle: 'Confirm Submission',
      nzContent: 'Are you sure you want to submit?',
      nzOnOk: () => {
        this.finalSubmit();
        window.location.reload();
      }
    });
  }
  finalSubmit()
  {
    var frmData = new FormData();
    frmData.append("EmpID",this.EmpID);

    this._service.FinalSubmit(frmData).subscribe({
      next : (res)=>
        {
        this.msgService.success(res.message, 
        {
          nzDuration: 3000,
        })
        localStorage.clear();
      },
      error :(err)=>{
        this.msgService.success(err.message, 
          {
            nzDuration: 3000,
          })
      },
    })
  }

  getFinalSubmit() 
  { 
    if (localStorage.getItem('EmpID') != null) {
      this.finalSubmitservice.GetFinalSubmitByEmpId(localStorage.getItem('EmpID')).subscribe({
        next: (res) => {
          if (res.success === false) {
            this.isfinalSubmit = true;
            this.showFinalSubmitedPage = false;
          } else {
            var data = res.datas;
            if (data && data.length > 0 && data[0].hasOwnProperty('isFinalSubmit')) {
              if (data[0].isFinalSubmit === true) {
                this.isfinalSubmit = false;
                this.showFinalSubmitedPage = true;
              } else {
                this.isfinalSubmit = false;
                this.showFinalSubmitedPage = true;
              }
            } else {
              this.isfinalSubmit = true;
              this.showFinalSubmitedPage = false;
            }
          }
        },
      });
    }
    else{
      this.isfinalSubmit =  true ;
      this.showFinalSubmitedPage = false;
    }
   
  }

}
