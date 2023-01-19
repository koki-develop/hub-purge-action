const core = require("@actions/core");

try {
  console.log("Hello World");
} catch (error) {
  core.setFailed(error.message);
}
