import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeFinalSubmitService } from '../app.services/employee-final-submit.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private finalSubmitService: EmployeeFinalSubmitService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const empId = localStorage.getItem('EmpID');
    const routeKey = route.paramMap.get('key');
    const storedKey = localStorage.getItem('EncKey');

    if (!empId || (routeKey !== null && routeKey !== storedKey)) {
      return of(true);
    }

    return this.finalSubmitService.GetFinalSubmitByEmpId(empId).pipe(
      map((res) => {
        if (res?.success !== true || !Array.isArray(res.datas) || res.datas.length === 0) {
          return true;
        }

        return res.datas[0]?.isFinalSubmit === true
          ? this.router.createUrlTree(['/finalsubmit'])
          : true;
      }),
      catchError(() => of(true))
    );
  }
}
