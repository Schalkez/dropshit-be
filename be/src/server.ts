import app from "./app";
import { scheduleCheckVote } from "./controllers/user.controller";

app
  .listen(7070, async () => {
    console.log(`Server running on port : ${7070}`);
    await scheduleCheckVote();
  })
  .on("error", (e) => console.log(e));
