/** ---------------------------------------------------------------------------------------------
 * Server (this will run on the server , so we can use Node.js code here)
 */
import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

export default function handler(req, res) {
  if (req.method === "POST") {
    // JSON 變物件 (接收 JSON 字串，轉為 Javascript 物件或是值)
    const receiveData = JSON.parse(req.body);
    const email = receiveData.email;
    const feedback = receiveData.feedback;

    const newFeedback = {
      // it's not a best way for id, but it's fine for development or practice just give a dummy ID
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ msg: "Success! store in.", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ msg: "This works, return feedback.json info.",feedback: data});
  }
}
