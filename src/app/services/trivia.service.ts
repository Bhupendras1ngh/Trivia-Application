import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

  questionData !:any [];


  public getQuestions(){
    return this.http.get('https://opentdb.com/api.php?amount=50&category=18&type=multiple');
    // .subscribe({
    //   next: (res):any=>{
    //       console.log(res);
    //   },
    //   error: (err)=>{
    //       console.error(err);
    //   }
    // })
  }
}
