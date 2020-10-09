import * as core from "@actions/core";
import * as github from "@actions/github";
import { assert } from "console";

const context = github.context;

async function run() {
  try {
    const secrets = core
      .getInput("secrets", { required: true })
      .toUpperCase()
      .split(",");
    let branch = refToBranch(process.env.GITHUB_REF);

    core.info(`Context: ${JSON.stringify(context)}`);
    if (context.eventName == "pull_request") {
      branch = refToBranch(process.env.GITHUB_BASE_REF);
    }

    core.info(`Target branch: ${branch}`);

    secrets.forEach((secret) => {
      core.exportVariable(
        `${secret}_NAME`,
        `${secret}_${branch.toUpperCase()}`
      );
    });

    core.exportVariable("TARGET_BRANCH", branch);
    core.exportVariable("TARGET_BRANCH_U", branch.toUpperCase());
  } catch (error) {
    core.setFailed(error.message);
  }
}

function refToBranch(ref: string) {
  assert(
    ref.startsWith("refs/heads/"),
    `Ref ${ref} doesn't start with refs/heads/`
  );
  return ref.replace("refs/heads/", "");
}

run();
