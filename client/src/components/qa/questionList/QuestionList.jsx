import React from 'react';
import QuestionListEntry from './QuestionListEntry';
import AnswerList from './AnswerList';

export default function QuestionList({ qArray }) {
  console.log(qArray);
  return (
    <div className="qa-container" data-testid="question-list">
      {
        qArray.map((q) => (
          <div className="qa-entry" key={q.id}>
            <QuestionListEntry question={q} />
            <AnswerList id={q.id} />
          </div>
        ))
      }
    </div>
  );
}
