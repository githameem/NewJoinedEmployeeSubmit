import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeFinalSubmitService } from './app.services/employee-final-submit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NewJoinedEmployee';
  key = localStorage.getItem('EmpCode');
  EmpID: any;
  isfinalSubmit = false;
  showFinalSubmitedPage = false;

  constructor(
    private router: Router,
    private msgService: NzMessageService,
    private modalService: NzModalService,
    private finalSubmitService: EmployeeFinalSubmitService
  ) {}

  ngOnInit(): void {
    this.EmpID = localStorage.getItem('EmpID');
    this.finalSubmitService.finalSubmitted$.subscribe(({ empId, submitted }) => {
      if (String(localStorage.getItem('EmpID')) === String(empId)) {
        this.EmpID = empId;
        this.key = localStorage.getItem('EmpCode');
        this.setFinalSubmitState(submitted);
      }
    });

    const routeKey = this.router.url.match(/^\/basic\/([^/?]+)/)?.[1];
    if (!routeKey || routeKey === localStorage.getItem('EncKey')) {
      this.getFinalSubmit();
    }
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  ClearStorage(): void {
    localStorage.clear();
    this.msgService.info('Refreshed!', { nzDuration: 2500 }).onClose!;
  }

  FinalSubmit(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Submission',
      nzContent: 'Are you sure you want to submit?',
      nzOnOk: () => this.finalSubmit(),
    });
  }

  finalSubmit(): void {
    const frmData = new FormData();
    frmData.append('EmpID', this.EmpID);

    this.finalSubmitService.FinalSubmit(frmData).subscribe({
      next: (res) => {
        if (res?.success !== true) {
          this.msgService.error(res?.message || 'Final submission failed.');
          return;
        }

        this.msgService.success(res.message, { nzDuration: 3000 });
        this.getFinalSubmit(this.EmpID);
      },
      error: (err) => {
        this.msgService.error(err.message || 'Final submission failed.');
      },
    });
  }

  getFinalSubmit(empId: any = this.EmpID): void {
    if (!empId) {
      this.setFinalSubmitState(false);
      return;
    }

    this.finalSubmitService.isFinalSubmitted(empId).subscribe((submitted) => {
      this.EmpID = empId;
      this.setFinalSubmitState(submitted);
    });
  }

  private setFinalSubmitState(submitted: boolean): void {
    this.isfinalSubmit = !submitted;
    this.showFinalSubmitedPage = submitted;
  }
}
