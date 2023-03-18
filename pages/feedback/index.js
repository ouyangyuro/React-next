import React from "react";

function FeedBack({ feedbackItems }) {
  return (
    <ul>
      {feedbackItems?.map((item) => (
        <li key={item.id}>
          email: {item.email} / feedback: {item.feedback}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(){
    fetch()
}

export default FeedBack;
