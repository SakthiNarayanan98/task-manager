import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerPanel } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgControl } from '@angular/forms';
import { DataService } from "../../core/services/data.service";
import { id } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;
  subPopUp: any;
  createTask!: FormGroup
  sakthi = 'sakthi'
  names = ['Sakthi', 'Anees', 'Arunthmil'];
  priority = ['High', 'Medium', 'Low'];
  
  startDate: Date | null = null;
  dueDate: Date | null = null;
  startTime!: Date | null;
  picker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
displayedColumns: any;
  tasks!: any[];
  id!: string;
  taskIdToDelete: string = '';
  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private service: DataService) {}

  ngOnInit(): void {
      this.taskForm();
      this.getDate()
  }



  taskForm() {
    this.createTask = this.fb.group({
      title: new FormControl('',[Validators.required]),
      notes: new FormControl('',[Validators.required]),
      startDate: new FormControl('',Validators.required),
      dueDate: new FormControl('',[Validators.required]),
      organizer: [this.sakthi],
      assigner: [this.names[0], [Validators.required]],
      estimateHrs: new FormControl('',[Validators.required]),
      duration: new FormControl('',[Validators.required]),
      priority: [this.priority[0], [Validators.required]], 
    })
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  createNewTask() {
    debugger
    // Check if the form is valid
    if (this.createTask.valid) {
      // You can handle the creation logic here
      const newTask = this.createTask.value;
      console.log('New Task:', newTask);
      this.service.saveProduct(newTask)

      // Optionally, close the dialog
    }else {
      console.log('error');
    }
  }

  getDate() {
    this.service.getProduct().subscribe(
      (data: any) => {
        console.log('Data fetched successfully:', data);
        debugger
        this.tasks = Object.values(data); // Convert the data object into an array
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteTask(id: string): void {
    this.service.deleteTask(id).subscribe(
      () => {
        console.log('Task deleted successfully!');
        // Optionally, you can update your tasks array or fetch updated data here
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  
  
  
  startTimeSelected(event: MatDatepickerInputEvent<Date>) {
    this.startTime = event.value;
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.subPopUp = this.dialog.open(templateRef,{
        width: '60%',
        disableClose: true,
        data: { contentTemplate: templateRef },
      });
  
    this.subPopUp.afterClosed().subscribe(() => {
      // Handle closed event if needed
    });
  }
  


  

 

}
