import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

  public questionData !:any [];
  public username ="";
  public leaderboardscores :Array<any>=[];


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
  updateScore(score: any){
    this.http.get("http://localhost:3000/leaderboard?username=" + this.username).subscribe((res:any)=>{
      console.log(res);
      if( res.length == 0){
        this.http.post("http://localhost:3000/leaderboard" ,{username : this.username ,score:score}).subscribe(
          (resp:any)=>{
            console.log(resp);
          }
        );
      }
      else{
          if(res[0].score < score){
            res[0].score =score;
            this.http.put("http://localhost:3000/leaderboard/'" + res[0].id ,res[0]).subscribe((res0=>{
              console.log(res);
            }));
          }
      }
  }
    )
  }
  public getHighScores(){
   return this.http.get("http://localhost:3000/leaderboard");
    // .subscribe((res:any)=>{
    // console.log("*******")  
    // console.log(res);
    //   this.leaderboardscores =res;
    //   console.log(this.leaderboardscores)
    // })
  }
}
