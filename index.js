const core = require("@actions/core");

try {
  console.log("Hello World, 1");
} catch (error) {
  core.setFailed(error.message);
}
