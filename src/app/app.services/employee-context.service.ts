import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeFinalSubmitService } from './employee-final-submit.service';

/**
 * Holds the employee bound to the current browser tab.
 * empId (DB primary key) and empCode (employee code, from the URL key) are DIFFERENT values.
 * Stored in sessionStorage so each tab keeps its own employee.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeContextService {
  private static readonly KEY_ID = 'EmpID';
  private static readonly KEY_CODE = 'EmpCode';
  private static readonly KEY_ENC = 'EncKey';

  /** null = unknown/loading, true = submitted, false = not submitted */
  readonly finalSubmitted$ = new BehaviorSubject<boolean | null>(null);

  constructor(private finalSubmitService: EmployeeFinalSubmitService) {}

  get empId(): string | null { return sessionStorage.getItem(EmployeeContextService.KEY_ID); }
  get empCode(): string | null { return sessionStorage.getItem(EmployeeContextService.KEY_CODE); }
  get encKey(): string | null { return sessionStorage.getItem(EmployeeContextService.KEY_ENC); }

  setEmployee(empId: any, empCode: any, encKey?: string | null): void {
    sessionStorage.setItem(EmployeeContextService.KEY_ID, String(empId));
    sessionStorage.setItem(EmployeeContextService.KEY_CODE, String(empCode));
    if (encKey) sessionStorage.setItem(EmployeeContextService.KEY_ENC, encKey);
  }

  clear(): void {
    sessionStorage.removeItem(EmployeeContextService.KEY_ID);
    sessionStorage.removeItem(EmployeeContextService.KEY_CODE);
    sessionStorage.removeItem(EmployeeContextService.KEY_ENC);
    sessionStorage.removeItem('NomineeId');
    sessionStorage.removeItem('eduInsert');
    this.finalSubmitted$.next(null);
  }

  /** Always asks the API for the current employee; never cached. */
  refreshFinalSubmitStatus(): Observable<boolean> {
    return this.finalSubmitService
      .isFinalSubmitted(this.empId)
      .pipe(tap((submitted) => this.finalSubmitted$.next(submitted)));
  }
}
