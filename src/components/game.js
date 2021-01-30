import m from 'mithril';

const answerToggle = (e, update, i, arr) => {
  if(e.target.innerText === 'visa svar'){
    update('block', 'dölj svar');
  }
  else{ 
    update('none', 'visa svar');
  }
};
let ToggleAnswer = {
  show: 'none',
  toggleText: 'visa svar',
  answer: '',
  oninit: vnode => vnode.state.answer = vnode.attrs.answer,
  onupdate: (vnode) => {
    if(vnode.state.answer !== vnode.attrs.answer){
      vnode.state.answer = vnode.attrs.answer;
      vnode.state.show = 'none';
      vnode.state.toggleText = 'visa svar';
      m.redraw();
    }
  },
  toggle: (state) => (disp, t) => {
    state.show = disp;
    state.toggleText = t;
  },
  spawn: (ans, state) => {
    return [
      m('button', {onclick: (e) => answerToggle(e, ToggleAnswer.toggle(state))}, state.toggleText),
      m('div', {class: 'answer', style: `display: ${state.show};`}, ans)
    ]
  },
  view: (vnode) => m('div', {class: 'ToggleAnswer'}, [
    ToggleAnswer.spawn(vnode.attrs.answer, vnode.state)
  ])
}
let Game = {
  view: (vnode) => m('div', {class: 'Game'}, [
    m('div',{class: 'subject'},m('h2', vnode.attrs.question.subject)),
    m('div',{class: 'questions'},
      vnode.attrs.question.questions.map(e => [
        m('div', {class: 'question'}, e.question),
        m(ToggleAnswer, {answer: e.answer})
      ]
      )
    ),
    m('div',{class: 'explanation'},[
      m('p', 'Ex, tryck 1 för rätt eller tryck 2 för fel'),
      m('p', 'Om 1 (rätt) frågeexempel kommer inte igen'),
      m('p', 'Om 2 (fel) fråge kan återkomma'),
    ]),
  ])
};

export default Game;
