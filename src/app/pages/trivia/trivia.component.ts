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
 countDown =15;



 ngOnInit(){
  this.triviaService.getQuestions().subscribe(
    (res:any)=>{
      console.log(res);
      this.triviaService.questionData = res.results;
      console.log(this.triviaService.questionData)
      this.triviaService.questionData[this.questionIndex].incorrect_answers.push(this.triviaService.questionData[this.questionIndex].correct_answer);
      this.triviaService.questionData[this.questionIndex].incorrect_answers.sort(()=>0.5 - Math.random());
      console.log(this.triviaService.questionData[this.questionIndex].incorrect_answers)
      let timer = setInterval(()=>{
       
       if( this.userAnser == "" && this.countDown !=0 )this.countDown--;
       if(this.countDown ==0){
        clearInterval(timer);
        this.triviaService.updateScore(this.score);
        setTimeout(()=>{
          this.router.navigate(['/home'])
        } ,4000)
       }
      } ,1000)
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
      this.countDown =15;
    } ,4000) 
  }
  else{
    this.triviaService.updateScore(this.score)
    setTimeout(()=>{
    this.router.navigate(['/home'])
    }, 4000)
  }
 }

}
