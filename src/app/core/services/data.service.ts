import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { TaskComponent } from "../../components/task/task.component";
// import { AngularFirestore  } from '@angular/fire/compat/firestore';


// import { Firestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
  private toaster: ToastrService,
  // private task: TaskComponent
  ) { }

  private firebaseUrl = 'https://task-manager-e46f2-default-rtdb.firebaseio.com/task';


  checkEmailExists(email: string): Observable<boolean> {
    debugger
    return this.http.get<any>(this.firebaseUrl).pipe(
      switchMap((data) => {
        if (data) {
          // Convert data object into an array of tasks
          const tasks: any[] = Object.values(data);

          // Check if the email exists in any task
          return of(tasks.some((task) => task.email === email)); // Correct import
        } else {
          // No data or empty data
          return of(false); // Correct import
        }
      }),
      catchError((error) => {
        console.error('Error checking email existence:', error);
        throw error;
      })
    );
  }

  // saveProduct(task: any): void {
  //   debugger
  //   // const email = task.email; // Replace with the actual email field in your task object

    
      
  //       // Proceed to save data if the email doesn't exist
  //       this.http.post(this.firebaseUrl, task).subscribe(
  //         (response) => {
  //          this.toaster.success('Data saved successfully');
  //          console.log('response',response);
           
  //           debugger;
  //         },
  //         (error) => {
  //          this.toaster.error('Error saving data:')
  //         }
  //       );
      
  //   };
  

 
  saveProduct(task: any) {
    this.http.post('https://task-manager-e46f2-default-rtdb.firebaseio.com/task.json', task)
      .subscribe(response => {
        console.log('Data saved successfully:', response);
        this.toaster.success('Data saved successfully');
      //  this.task.getData();
        debugger
      }, error => {
        console.error('Error saving data:', error);
        this.toaster.error('Error saving data:')
      });
  }

  getProduct(): Observable<any> {
    return this.http.get('https://task-manager-e46f2-default-rtdb.firebaseio.com/task.json');
  }

  deleteTask(id: string): Observable<any> {
    debugger
    const url = `${this.firebaseUrl}/${id}.json`;

    return this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error('Error deleting task:', error);
        throw error;
      })
    );
  }

  updateTask(id: string, payload: any): Observable<any> {
    const url = `${this.firebaseUrl}/${id}.json`;
  
    return this.http.put(url, payload).pipe(
      catchError((error: any) => {
        console.error('Error updating task:', error);
        throw error;
      })
    );
  }
  

  getTaskById(dynamicIds: string): Observable<any> {
    debugger
    // if (!email) {
    //   console.error('Received undefined email in getTaskById method.');
    //   return throwError('Invalid email parameter.');
    // }

    const url = `${this.firebaseUrl}/${dynamicIds}.json`;

    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching task by ID:', error);
        throw error;
      })
    );
  }

}
