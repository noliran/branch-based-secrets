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
    let ref = process.env.GITHUB_REF;

    if (context.eventName == "pull_request") {
      ref = process.env.GITHUB_BASE_REF;
    }

    const branch = refToBranch(ref);

    core.info(`Target branch: ${branch}`);

    secrets.forEach((secret) => {
      core.exportVariable(
        `${secret}_NAME`,
        `${secret}_${branch.toUpperCase()}`
      );
    });

    core.exportVariable("TARGET_BRANCH", branch);
    core.exportVariable("TARGET_BRANCH_U", branch.toUpperCase());
  } catch (error:any) {
    core.setFailed(error.message);
  }
}

function refToBranch(ref: string) {
  if (ref.startsWith("refs/") && !ref.startsWith("refs/heads/")) {
    throw new Error(`Ref ${ref} doesn't point to a branch`);
  }

  return ref.replace("refs/heads/", "");
}

run();
