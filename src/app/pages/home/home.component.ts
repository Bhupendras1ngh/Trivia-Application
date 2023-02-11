import { Component } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public triviaservice :TriviaService){}
  ngOnInit(){
    this.triviaservice.getHighScores().subscribe(
      (res :any)=>{
        this.scores =res;
      }
    );
    // this.scores =this.triviaservice.leaderboardscores;
    // console.log("&&&&")
    // console.log(this.scores);
  }
  scores: Array<any> =[];
}
