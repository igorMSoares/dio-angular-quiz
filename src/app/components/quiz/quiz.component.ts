import { Component } from '@angular/core';
import quizQuestions from '../../../assets/data/quiz-questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  title: string = '';

  questions: any;
  selectedQuestion: any;

  answers: string[] = [];
  selectedAnswer: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizQuestions) {
      this.finished = false;
      this.title = quizQuestions.title;

      this.questionIndex = 0;

      this.questions = quizQuestions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoice(value: string) {
    this.answers.push(value);
    this.nextStep();
    console.log(this.answers)
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionIndex < this.questionMaxIndex) {
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.selectedAnswer =
        quizQuestions.results[
          finalAnswer as keyof typeof quizQuestions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      return arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
        ? previous
        : current;
    });

    return result;
  }

  restartQuiz() {
    this.questionIndex = 0;
    this.selectedQuestion = this.questions[this.questionIndex];
    this.answers = [];
    this.finished = false;
  }
}
