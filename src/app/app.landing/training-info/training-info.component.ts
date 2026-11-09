import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeTrainingService } from 'src/app/app.services/employee-training.service';

@Component({
  selector: 'app-training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.css']
})
export class TrainingInfoComponent implements OnInit 
{
  trainigList: any;
  EmpId : any;
  isVisible = false;
  isConfirmLoading = false;
  selectedTraining : any;
  showButton = true;
  showButtonSubmit = true;
  showButtonUpdate = true;
  constructor(private trainingservice: EmployeeTrainingService, private msgService : NzMessageService, private datePipe : DatePipe){

  }
  ngOnInit(): void {
    this.EmpId = sessionStorage.getItem("EmpID");
    this.getTrainingByEmp();
  }

  trainingForm = new FormGroup({
    // ID: new FormControl(''),
    EmpID : new FormControl(''),
    CourseName : new FormControl('', Validators.required),
    StartDate : new FormControl('', Validators.required),
    EndDate : new FormControl('', Validators.required),
    Result : new FormControl('',Validators.required),
    Institute : new FormControl('')
  })

  getTrainingByEmp(){
    this.trainingservice.GetTrainingByEmpId(this.EmpId).subscribe({
      next: (res)=>{
        this.trainigList = res.datas;
      }
    })
  }
  showModal()
  {
    this.isVisible = true;   
     this.showButtonSubmit = true;
    this.showButtonUpdate = false;
  }
  showmodalForUpdate(){
    this.isVisible = true;
    this.showButtonSubmit = false;
    this.showButtonUpdate = true;
  }

  handleOk(): void {
    if (this.trainingForm.valid) 
      {
        this.trainingForm.value.EmpID = this.EmpId;
        var trainingObj = this.trainingForm.value;
        this.trainingservice.AddTraining(trainingObj).subscribe({
          next: (response)=>
          {
            this.msgService.success(response.message, {
              nzDuration: 3000
            });
            this.getTrainingByEmp()
          },
          error: (error) =>{
            this.msgService.error(error.message, {
              nzDuration: 3000
            });
          }
  
        })
      } 
      else 
      {
        Object.values(this.trainingForm.controls).forEach(control => 
        {
          if (control.invalid) 
          {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
      this.trainingForm.reset();
      this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  Update(data: any){
    this.selectedTraining = data
    this.trainingForm.patchValue({
      EmpID : this.selectedTraining.empID,
      CourseName : this.selectedTraining.courseName,
      StartDate :this.selectedTraining.startDate,
      EndDate: this.selectedTraining.endDate,
      Result: this.selectedTraining.result,
      Institute: this.selectedTraining.institute,
    });
    this.showmodalForUpdate();
  }
  handleUpdate(){
    if (this.trainingForm.valid) 
      {
        this.trainingForm.value.EmpID = this.EmpId;
        var trainingObj = this.trainingForm.value;
        var formdata = new FormData();
        formdata.append('ID',this.selectedTraining.id);
        formdata.append('EmpID',trainingObj.EmpID?? '');
        formdata.append('CourseName',trainingObj.CourseName?? '');
        formdata.append('StartDate', this.datePipe.transform(trainingObj.StartDate,'yyyy-MM-dd')?? '');
        formdata.append('EndDate',this.datePipe.transform(trainingObj.EndDate,'yyyy-MM-dd')?? '');
        formdata.append('Result',trainingObj.Result?? '');
        formdata.append('Institute',trainingObj.Institute?? '');
        
        this.trainingservice.UpdateTraining(formdata).subscribe({
          next: (response)=>
          {
            this.msgService.success(response.message, {
              nzDuration: 3000
            });
            this.getTrainingByEmp()
          },
          error: (error) =>{
            this.msgService.error(error.message, {
              nzDuration: 3000
            });
          }
  
        })
      } 
      else 
      {
        Object.values(this.trainingForm.controls).forEach(control => 
        {
          if (control.invalid) 
          {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
      this.trainingForm.reset();
      this.isVisible = false;
  }
  Delete(id: any){
    this.trainingservice.DeleteTraining(id).subscribe({
      next: (response) =>{
        this.msgService.success(response.message);
        this.getTrainingByEmp();
      },
      error: (err)=>{
        this.msgService.error(err.message);
      }
    })
  }
 
}
