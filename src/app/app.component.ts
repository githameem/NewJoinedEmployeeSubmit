import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeFinalSubmitService } from './app.services/employee-final-submit.service';
import { EmployeeContextService } from './app.services/employee-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NewJoinedEmployee';
  isfinalSubmit = false;
  showFinalSubmitedPage = false;
  loading = true;
  submitting = false;
  private sub?: Subscription;

  constructor(
    private router: Router,
    private msgService: NzMessageService,
    private modalService: NzModalService,
    private finalSubmitService: EmployeeFinalSubmitService,
    public context: EmployeeContextService
  ) {}

  ngOnInit(): void {
    this.sub = this.context.finalSubmitted$.subscribe((value) => {
      this.loading = value === null;
      this.isfinalSubmit = value === false;
      this.showFinalSubmitedPage = value === true;
    });

    // On a non-basic route (e.g. refresh on /contact) resolve status for the tab's employee.
    // basic/:key resolves it itself after loading the employee from the URL.
    const isBasicWithKey = /^\/basic\/[^/?]+/.test(this.router.url) || /#\/basic\/[^/?]+/.test(window.location.hash);
    if (!isBasicWithKey) {
      if (this.context.empId) {
        this.context.refreshFinalSubmitStatus().subscribe();
      } else {
        this.context.finalSubmitted$.next(false);
      }
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  navigateToBasic(): void {
    this.router.navigateByUrl(this.context.encKey ? '/basic/' + this.context.encKey : '/');
  }

  ClearStorage(): void {
    this.context.clear();
    sessionStorage.clear();
    this.msgService.info('Refreshed!', { nzDuration: 2500 });
  }

  FinalSubmit(): void {
    if (this.submitting) return;
    this.modalService.confirm({
      nzTitle: 'Confirm Submission',
      nzContent: 'Are you sure you want to submit?',
      nzOnOk: () => this.finalSubmit(),
    });
  }

  private finalSubmit(): void {
    const empId = this.context.empId;
    if (!empId) {
      this.msgService.error('Employee not loaded. Please open your registration link again.');
      return;
    }
    this.submitting = true;

    // Server-side pre-check: never submit twice.
    this.context.refreshFinalSubmitStatus().subscribe((alreadySubmitted) => {
      if (alreadySubmitted) {
        this.submitting = false;
        this.msgService.warning('Already submitted');
        return;
      }

      const frmData = new FormData();
      frmData.append('EmpID', empId);
      this.finalSubmitService.FinalSubmit(frmData).subscribe({
        next: (res) => {
          if (res?.success === false) {
            this.submitting = false;
            this.msgService.error(res?.message || 'Final submission failed.');
            return;
          }
          this.msgService.success(res?.message || 'Submitted successfully.', { nzDuration: 3000 });
          this.context.refreshFinalSubmitStatus().subscribe(() => (this.submitting = false));
        },
        error: (err) => {
          this.submitting = false;
          this.msgService.error(err?.message || 'Final submission failed.');
        },
      });
    });
  }
}
