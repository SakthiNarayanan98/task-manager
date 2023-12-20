import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;
  subPopUp: any;
  dialog: any;

  // constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
      
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.subPopUp = this.dialog.open(
      {
        template: templateRef, // Provide the TemplateRef directly
        width: '70%',
        disableClose: true,
      }
    );
  
    this.subPopUp.afterClosed().subscribe(() => {
      // Handle closed event if needed
    });
  }
  


  

  tasks = [
    {
      taskName: 'Task 1',
      estimateHr: 8,
      totalHr: 16,
      createdDate: '2023-12-16',
      endDate: '2023-12-20',
      start: '2023-12-18',
      edit: '2023-12-18',
      delete: '2023-12-18'
    },
    {
      taskName: 'Task 2',
      estimateHr: 8,
      totalHr: 16,
      createdDate: '2023-12-16',
      endDate: '2023-12-20',
      start: '2023-12-18',
      edit: '2023-12-18',
      delete: '2023-12-18'
    },
    {
      taskName: 'Task 3',
      estimateHr: 8,
      totalHr: 16,
      createdDate: '2023-12-16',
      endDate: '2023-12-20',
      start: '2023-12-18',
      edit: '2023-12-18',
      delete: '2023-12-18'
    },
    {
      taskName: 'Task 4',
      estimateHr: 8,
      totalHr: 16,
      createdDate: '2023-12-16',
      endDate: '2023-12-20',
      start: '2023-12-18',
      edit: '2023-12-18',
      delete: '2023-12-18'
    },  {
      taskName: 'Task 5',
      estimateHr: 8,
      totalHr: 16,
      createdDate: '2023-12-16',
      endDate: '2023-12-20',
      start: '2023-12-18',
      edit: '2023-12-18',
      delete: '2023-12-18'
    }
   
  ];

}
