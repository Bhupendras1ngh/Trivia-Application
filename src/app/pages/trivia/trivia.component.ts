import { Component } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
 constructor(public triviaService : TriviaService){}

 questionIndex = 0;




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
}
