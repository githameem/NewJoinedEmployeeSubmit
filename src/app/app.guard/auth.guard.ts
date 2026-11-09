import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeFinalSubmitService } from '../app.services/employee-final-submit.service';
import { EmployeeContextService } from '../app.services/employee-context.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private finalSubmitService: EmployeeFinalSubmitService,
    private context: EmployeeContextService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Read at call time: the guard is a singleton.
    const empId = this.context.empId;
    if (!empId) {
      return of(this.router.createUrlTree(['/']));
    }
    return this.finalSubmitService.isFinalSubmitted(empId).pipe(
      map((submitted) => (submitted ? this.router.createUrlTree(['/finalsubmit']) : true)),
      catchError(() => of(true))
    );
  }
}
