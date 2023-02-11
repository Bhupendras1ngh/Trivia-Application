import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
 constructor(public triviaService : TriviaService ,private router :Router){}

 questionIndex = 0;
 userAnser ="";
 score =0;



 ngOnInit(){
  this.triviaService.getQuestions().subscribe(
    (res:any)=>{
      //console.log(res);
      this.triviaService.questionData = res.results;
      console.log(this.triviaService.questionData)
      this.triviaService.questionData[this.questionIndex].incorrect_answers.push(this.triviaService.questionData[this.questionIndex].correct_answer);
      this.triviaService.questionData[this.questionIndex].incorrect_answers.sort(()=>0.5 - Math.random());
      console.log(this.triviaService.questionData[this.questionIndex].incorrect_answers)
    }
  )
 }

 selectAnswer(option:string){
   this.userAnser =option
  if(this.triviaService.questionData[this.questionIndex].correct_answer ==option){
    this.score +=5;
    setTimeout(()=>{
      this.userAnser ="";
      this.questionIndex++;
      this.triviaService.questionData[this.questionIndex].incorrect_answers.push(this.triviaService.questionData[this.questionIndex].correct_answer);
      this.triviaService.questionData[this.questionIndex].incorrect_answers.sort(()=>0.5 - Math.random());
    } ,2000) 
  }
  else{
    setTimeout(()=>{
    this.router.navigate(['/home'])
    }, 2000)
  }
 }
}
