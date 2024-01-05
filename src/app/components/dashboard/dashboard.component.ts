import { Component, OnInit } from '@angular/core';
import { getData1, getData } from './your-data-file';
import { AgCharts } from 'ag-charts-community';
import { DataService } from "../../core/services/data.service";
import { async, asyncScheduler } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskTypeCounts!: { [taskType: string]: number; };
  result: any;
  data1: any;
  completedTaskCount: number = 0;
  createTaskCount: number = 0;
  holdTaskCount: number = 0;
  stopTaskCount: number = 0;
  tasks!: any[];


  constructor(private dataService: DataService,
    private router: Router) { }

  data: any; //! Replace 'any' with the actual type of your data structure
  numFormatter = new Intl.NumberFormat('en-US');
  total!: number;

  ngOnInit() {
    this.createChart();
    this.dynamicHrs()
      // !Dynamic data patch tha pie chart
      .then(() => {
        console.log('this.datasa:', this.data1);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.dynamicData()
      // !Dynamic data patch tha pie chart
      .then(() => {
        console.log('this.data:', this.data);
        debugger
        this.total = this.data.reduce((sum: number, d: any) => sum + d.count, 0);

        const options: any = {
          container: document.getElementById('myChart'),
          data: this.data,
          series: [
            {
              type: 'pie',
              calloutLabelKey: 'type',
              angleKey: 'count',
              sectorLabelKey: 'count',
              calloutLabel: {
                enabled: false,
              },
              sectorLabel: {
                formatter: ({ datum, sectorLabelKey }: { datum: any; sectorLabelKey: string }) => {
                  const value = datum[sectorLabelKey];
                  return this.numFormatter.format(value);
                },
              },
              title: {
                text: 'Task Count',
              },
              innerRadiusRatio: 0.7,
              innerLabels: [
                {
                  text: this.numFormatter.format(this.total),
                  fontSize: 24,
                },
                {
                  text: 'Task',
                  fontSize: 16,
                  margin: 10,
                },
              ],
              tooltip: {
                renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }: {
                  datum: any;
                  calloutLabelKey: string;
                  title: string;
                  sectorLabelKey: string;
                }) => {
                  return {
                    title,
                    content: `${datum[calloutLabelKey]}: ${this.numFormatter.format(datum[sectorLabelKey])}`,
                  };
                },
              },
              strokeWidth: 3,
            },
          ],
        };

        const chart = AgCharts.create(options);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



  dynamicData(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.dataService.getProduct().toPromise();
        console.log('this.data', data);

        const result = await this.countTaskTypes(data);
        this.data = result;

        // !Modify this.total calculation here
        this.total = this.data.reduce((sum: number, d: any) => sum + d.count, 0);
        console.log('Updated this.data:', this.data);

        // !filtered the completed  your task data

        const completedtask = this.data.filter((task: { type: string; }) => task.type === 'Completed');
        this.completedTaskCount = completedtask.reduce((sum: any, task: { count: any; }) => sum + task.count, 0)
        console.log('Completed Task Count:', this.completedTaskCount);

        // !filtered the hold  your task data

        const holdtask = this.data.filter((task: { type: string; }) => task.type === 'Hold');
        this.holdTaskCount = holdtask.reduce((sum: any, task: { count: any; }) => sum + task.count, 0)
        console.log('Completed Task Count:', this.holdTaskCount);

        // !filtered the created  your task data

        const createtask = this.data.filter((task: { type: string; }) => task.type === 'Start');
        this.createTaskCount = createtask.reduce((sum: any, task: { count: any; }) => sum + task.count, 0)
        console.log('Completed Task Count:', this.createTaskCount);

        //  !filtered the stop  your task data

        const starttask = this.data.filter((task: { type: string; }) => task.type === 'Stop');
        this.stopTaskCount = starttask.reduce((sum: any, task: { count: any; }) => sum + task.count, 0)
        console.log('Completed Task Count:', this.stopTaskCount);
        resolve();
      } catch (error) {
        console.error('Error processing data:', error);
        reject(error);
      }
    })
  }






  countTaskTypes(data: any): Promise<{ type: string; count: number }[]> {
    return new Promise((resolve, reject) => {
      if (typeof data !== 'object' || data === null) {
        reject('Invalid data format');
        return;
      }

      const dataArray = Object.values(data);

      const taskTypeCounts: { [taskType: string]: number } = {};

      dataArray.forEach((task: any) => {
        try {
          const taskType = task?.taskType || 'Uncategorized';
          taskTypeCounts[taskType] = (taskTypeCounts[taskType] || 0) + 1;
        } catch (error) {
          console.error('Error processing task:', task);
          reject(error);
        }
      });

      const resultArray = Object.entries(taskTypeCounts).map(([type, count]) => ({ type, count }));
      resolve(resultArray);
    });
  }




  dynamicHrs(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.dataService.getProduct().toPromise();
        console.log('this.data2', data);

        const result = await this.countHrsInTask(data);
        this.data1 = result;
        // Modify this.total calculation here
        this.total = this.data1.reduce((sum: number, d: any) => sum + d.count, 0);
        console.log('Updated this.dataaaa:', this.total);

        resolve()

      } catch (error) {
        console.error('Error processing data:', error);
        reject(error);
      }
    })
  }

  countHrsInTask(data: any): Promise<{ day: string; hrs: number }[]> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof data !== 'object' || data === null) {
          reject('Invalid data format');
          return;
        }

        const dataArray = Object.values(data);
        debugger
        const dayCounts: { [day: string]: number } = {};

        dataArray.forEach((task: any) => {
          try {
            const dueDate = new Date(task.dueDate);
            const dayOfWeek = dueDate.toLocaleDateString('en-US', { weekday: 'short' });

            // Example: Assuming 8 hours per day, adjust it according to your logic
            const hoursInDay = parseInt(task.duration);

            dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + parseInt(task.duration, 10) * hoursInDay / 3;
          } catch (error) {
            console.error('Error processing task:', task);
            reject(error);
          }
        });

        const resultArray = Object.entries(dayCounts).map(([day, hrs]) => ({ day, hrs }));
        resolve(resultArray);
      } catch (error) {
        console.error('Error processing task hours:', error);
        reject(error);
      }
    });
  }

  // completetask(): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const data = this.dataService.getProduct().toPromise();
  //       console.log('completedData', data);

  //       resolve()

  //     } catch (error) {
  //       console.error('Error processing data:', error);
  //       reject(error);
  //     }
  //   })
  // }  

  completetask() {
         this.dataService.getProduct().subscribe((data: any) => {
          var result = data
          console.log('completedData', result);
          const completedTask = Object.values(data).filter((task: any) =>task.taskType === 'Completed');
          console.log('Completed Tasks:', completedTask);
          
        });        
      }

      holdtask() {
        this.dataService.getProduct().subscribe((data: any) => {
         var result = data
        //  console.log('completedData', result);
         const completedTask = Object.values(data).filter((task: any) =>task.taskType === 'Hold');
         console.log('Hold Tasks:', completedTask);
         
       });        
     }

     starttask() {
      this.dataService.getProduct().subscribe((data: any) => {
       var result = data
      //  console.log('completedData', result);
       const completedTask = Object.values(data).filter((task: any) =>task.taskType === 'Start');
       console.log('Start Tasks:', completedTask);
       
     });        
   }

   stoptask() {
    this.dataService.getProduct().subscribe((data: any) => {
     var result = data
    //  console.log('completedData', result);
     const completedTask = Object.values(data).filter((task: any) =>task.taskType === 'Stop');
     console.log('Stop Tasks:', completedTask);
     
   });        
 }

 gotoStop() {
  debugger
  this.router.navigate(['/auth/task'], { queryParams: { taskType: 'Stop' } });
}

gotoCompleted() {
  debugger
  this.router.navigate(['/auth/task'], { queryParams: { taskType: 'Completed' } });
}

gotoHold() {
  debugger
  this.router.navigate(['/auth/task'], { queryParams: { taskType: 'Hold' } });
}

gotoStart() {
  debugger
  this.router.navigate(['/auth/task'], { queryParams: { taskType: 'Start' } });
}

 

createChart() {
  function formatNumber(value: number): string {
    return `${Math.floor(value)}H`;
  }

  // Use async/await to wait for the dynamicHrs promise to resolve
  const dynamicHrsData = async () => {
    try {
      await this.dynamicHrs();
      return this.data1;
    } catch (error) {
      console.error('Error:', error);
      return []; // or handle the error appropriately
    }
  };

  dynamicHrsData().then((resolvedData) => {
    const options: any = {
      container: document.getElementById('myChart1'),
      data: resolvedData,
      title: {
        text: 'Total day of working',
      },
      footnote: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'bar',
          xKey: 'day',
          yKey: 'hrs',
          label: {
            formatter: ({ value }: { value: number }) => formatNumber(value),
          },
          tooltip: {
            renderer: ({ datum, xKey, yKey }: { datum: any; xKey: string; yKey: string }) => {
              return { title: datum[xKey], content: formatNumber(datum[yKey]) };
            },
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Hrs',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Total working hrs',
          },
          label: {
            formatter: ({ value }: { value: number }) => formatNumber(value),
          },
        },
      ],
    };

    const chart = AgCharts.create(options);
  });
}


}


