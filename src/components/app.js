import m from 'mithril';
import Game from './game'

const swap = (arr, from, to) => {
  const temp = arr[to];
  arr[to] = arr[from];
  arr[from] = temp;
}

const shuffle = (array) => {
  for(let i = array.length - 1; i >= 0; i--){
    const j = Math.floor(Math.random() * i)
    swap(array, i, j); 
  }
} 

const answerCorrect = (arr, max) => {
  if(max === 1) return 0;
  const j = Math.floor(Math.random() * (max - 2));
  swap(arr, 0, max - 1);
  swap(arr, 0 , j);
  return max-1;
}

const answerWrong = (arr, max) => {
  if(max === 1) return;
  const j =  Math.floor(Math.random() * (max - 1)) + 1;
  swap(arr, 0, j);
};

const nextQuestion = (arr, max, update) => {
  return (event) => {
    if(max > 0){
      if(event.keyCode === 49) update(answerCorrect(arr, max));
      else if (event.keyCode === 50) answerWrong(arr, max)
    
      if(event.keyCode === 49 || event.keyCode === 50) m.redraw();
    }
  }
}

let App = {
  questions: QUESTIONS,
  max: 0,
  content: () => {
    if(App.max > 0) return m(Game, {
      question: App.questions[0]
    });
    else if (App.max < 1) return m({
      view: () => m('button', {
        onclick: () => {
          App.max = App.questions.length; 
          shuffle(App.questions)
        }
      }, 
      'igen?'
      )
    });
    else return m({view: () => m('p', 'laddar frågor')});
  },
  oncreate: () => {
    shuffle(App.questions);
    App.max = App.questions.length;
    m.redraw();
  },
  onupdate: () => {
    window.onkeypress = nextQuestion(App.questions, App.max, (n) => App.max = n);
  },
  view: () => m('div', {
    class: 'App', 
  }, App.content())
};
export default App;
