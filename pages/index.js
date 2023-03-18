import { useState, useRef } from "react";

export default function Home() {
  const [feedbackItem, setFeedbackItem] = useState();

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const handleFormSumbit = (e) => {
    e.preventDefault();

    const enterEmail = emailInputRef.current.value;
    const enterFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enterEmail, feedback: enterFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody), // 物件變 JSON (將任何物件轉變為 JSON 字串)
      header: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = (e) => {
    e.preventDefault();

    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItem(data.feedback);
      });
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <h1>Home Page</h1>
      <form onSubmit={handleFormSumbit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>submit</button>
        <hr />
        <button onClick={loadFeedbackHandler}>load feedback item</button>
        <ul>
          {feedbackItem?.map((item) => (
            <li key={item.id}>email: {item.email} / feedback: {item.feedback}</li>
          ))}
        </ul>
      </form>
    </>
  );
}
