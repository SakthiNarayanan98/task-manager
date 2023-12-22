import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  private firebaseUrl = 'https://task-manager-e46f2-default-rtdb.firebaseio.com/task/';

  saveProduct(task: any) {
    this.http.post('https://task-manager-e46f2-default-rtdb.firebaseio.com/task.json', task)
      .subscribe(response => {
        console.log('Data saved successfully:', response);
        debugger
      }, error => {
        console.error('Error saving data:', error);
      });
  }

  getProduct(): Observable<any> {
    return this.http.get('https://task-manager-e46f2-default-rtdb.firebaseio.com/task.json');
  }

  deleteTask(id: string): Observable<any> {
    if (!id) {
      console.error('Received undefined id in deleteTask method.');
      return throwError('Invalid id parameter.');
    }

    const url = `${this.firebaseUrl}/${id}.json`;

    return this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error('Error deleting task:', error);
        throw error;
      })
    );
  }
  
  
  
}
