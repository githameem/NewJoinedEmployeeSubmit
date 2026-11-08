import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeFinalSubmitService } from '../app.services/employee-final-submit.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate
{
  finalSubmitEmpId: any;
  isfinalSubmit = false;
  constructor(
    private finalSubmitService: EmployeeFinalSubmitService,
    private router: Router,
    private msgService: NzMessageService
  ) {
    this.finalSubmitEmpId = localStorage.getItem("EmpID");
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.finalSubmitService
        .GetFinalSubmitByEmpId(this.finalSubmitEmpId)
        .subscribe({
          next: (res) => {
            var data = res.datas;
            if (res.success == false) {
              resolve(true);
            }
            if (data[0].isFinalSubmit == true)
            {
              localStorage.setItem('FInalSubmit',"true");
              // resolve(false); // Allow navigation
              // this.msgService.create("error","You already Submitted Your information"); 
              resolve(this.router.navigate(['/finalsubmit']));
            }
            // else {
            //   resolve(false); 
              
            //   // Block navigation
            //   // You can also redirect to a different route here if needed
            //   // this.router.navigate(['/block-route']);
            // }
          },
          error: (error) => {
            // Handle error if needed
            console.error(error);
            resolve(false); // Block navigation on error
          },
        });
    });
  }
}
