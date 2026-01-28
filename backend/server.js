import "./src/config/env.js"
import app from "./src/app.js";
import db from "./src/config/db.js"
import router from "./src/routes/index.js"
console.log("acess 2 "+ process.env.JWT_ACCESS_SECRET);

const PORT = process.env.PORT || 5000;
db();
app.use(router);
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
