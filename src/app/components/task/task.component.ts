import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerPanel } from '@angular/material/datepicker';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgControl } from '@angular/forms';
import { DataService } from "../../core/services/data.service";
import { ToastrService } from 'ngx-toastr';
import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
[x: string]: any;
  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;
  subPopUp: any;
  product: Object = {};
  createTask!: FormGroup
  sakthi = 'sakthi'
  isEditMode = false;
  isCreate: boolean = true;
  taskWithId!: any
  selectedTaskId: any
  assigner = ['Sundar', 'Nirmal', 'Arunthmil'];
  priority = ['High', 'Medium', 'Low'];
  taskType = ['Completed','Hold','Start','Stop']
  // isCreate: boolean = false;
  private initialFormValues: any;
  startDate: Date | null = null;
  dueDate: Date | null = null;
  startTime!: Date | null;
  picker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
displayedColumns: any;
  tasks: any = {};
  id!: string;
  setId!: string;
  taskIdToDelete: string = '';
 
  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private service: DataService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.taskForm();
      this.getData();
      
  }



  taskForm() {
    this.createTask = this.fb.group({
      // id: new FormControl(''),
      title: new FormControl('',[Validators.required]),
      notes: new FormControl('',[Validators.required]),
      startDate: new FormControl('',Validators.required),
      dueDate: new FormControl('',[Validators.required]),
      organizer: [this.sakthi],
      assigner: [this.assigner, [Validators.required]],
      estimateHrs: new FormControl('',[Validators.required]),
      duration: new FormControl('',[Validators.required]),
      priority: [this.priority, [Validators.required]], 
      email: new FormControl ('',[ Validators.required,Validators.email]),
      taskType: new FormControl('')
    })
    this.initialFormValues = this.createTask.value;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  createNewTask() {
    this.isEditMode = true;
    debugger
    // Check if the form is valid
    if (this.createTask.valid) {
      // You can handle the creation logic here
      const newTask = this.createTask.value;
      console.log('New Task:', newTask);
      debugger
      this.service.saveProduct(newTask);
      // this.getData();
      // this.cancel();
      this.getData();
      
      // Optionally, close the dialog
    }else {
      console.log('error');
    }
  }

  

  getById(id: string): void {
  
    this.service.getTaskById(id).subscribe(
      (result: any) => {
       const task = result
  
        console.log('Data fetched getById successfully:', task);
        debugger;
  
        if (task) {
          // Assuming this.createTask is your FormGroup
          this.createTask.patchValue({
            id :id,
            assigner:task.assigner,
            dueDate: task.dueDate,
            duration: task.duration,
            email: task.email,
            estimateHrs: task.estimateHrs,
            notes: task.notes,
            organizer: task.organizer,
            priority: task.priority,
            startDate: task.startDate,
            title:task.title,
            taskType: task.taskType
          });

          //set the variable in id 
          this.setId = id
        } else {
          console.error('Task with ID not found.');
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  
  
  isFormDirty(): boolean {
    // Check if any of the form controls are dirty
    return Object.keys(this.createTask.controls).some(controlName => this.createTask.get(controlName)?.dirty);
  }

  isTaskTypeEmpty(): boolean {
    const taskTypeControl = this.createTask!.get('taskType');
    return !!taskTypeControl && !taskTypeControl.value;
  }
  
  
  
  

  getData() {
    debugger
    this.route.queryParams.subscribe((params: Params) => {
      const taskType: string | undefined = params['taskType'];
      
      // const taskType = 'Completed';

      // Check if taskType is provided and fetch data accordingly
      if (taskType) {
        this.service.getProduct().subscribe(
          (data: any) => {
            console.log('data',data);
            const dynamicIds = Object.keys(data);
            console.log('dynamicIds',dynamicIds);
            
            this.tasks = dynamicIds.map(id => {
              const taskWithId = { id, ...data[id] };
              return taskWithId;
            });
            
            // Filter tasks based on taskType
            this.tasks = Object.values(this.tasks).filter((task: any) => task.taskType === taskType);
            console.log('this.tasks',taskType,this.tasks);
            
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        // If taskType is not provided, fetch all data
        this.service.getProduct().subscribe(
          (data: any) => {
            // Extract IDs from the keys of the data object
            const dynamicIds = Object.keys(data);
  
            // Convert the data object into an array of tasks
            this.tasks = dynamicIds.map(id => {
              const taskWithId = { id, ...data[id] };
              return taskWithId;
            });
  
            // If you still want to modify each task within this.tasks to include id property
            this.tasks.forEach((task: any, index: number) => {
              task.id = dynamicIds[index];
            });
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      }
    });
  }

  updateClicktask() {
    if(this.setId) {
      this.updateTask(this.setId);
    }else{
      console.error('No task selected for update.');
    }
  }
  
  
  

  updateTask(id: any): void {
    debugger
    this.isEditMode = false;
    
    debugger
    const payload = {
      taskType: this.createTask.value.taskType,
      assigner:this.createTask.value.assigner,
            dueDate: this.createTask.value.dueDate,
            duration: this.createTask.value.duration,
            email:this.createTask.value.email,
            estimateHrs: this.createTask.value.estimateHrs,
            notes:this.createTask.value.notes,
            organizer:this.createTask.value.organizer,
            priority: this.createTask.value.priority,
            startDate:this.createTask.value.startDate,
            title:this.createTask.value.title,
            // id: this.createTask.value.id

    }

    this.service.updateTask(id, payload).subscribe(
      (response) => {
        this.toaster.success('Task updated successfully')
        this.getData();
        // Handle success, e.g., show a success message
      },
      (error) => {
        this.toaster.error('Error updating task')
        // Handle error, e.g., show an error message
      }
    );
  }

  deleteTask(id: string): void {
    debugger
    this.service.deleteTask(id).subscribe(
      () => {
        this.toaster.success('Task deleted successfully!')
        this.getData();
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
    debugger
    this.subPopUp = this.dialog.open(templateRef,{
        width: '60%',
        disableClose: true,
        data: { contentTemplate: templateRef },
      });
  
    // this.subPopUp.afterClosed().subscribe(() => {
    //   // Handle closed event if needed
    //   this.service.getProduct();
    // });
  }

  getCompletedTask() {
    this.service.getProduct().subscribe((data: any) => {
      console.log('completedTask',data);
      this. tasks = Object.values(data).filter((task: any) =>task.taskType === 'Completed');
      console.log('Completed Tasks:', this.tasks);
      

      
    })
  }

  cancel() {
    this.dialog.closeAll();
    this.getData();
    window.location.reload();
    
    
  }
  


  

 

}
