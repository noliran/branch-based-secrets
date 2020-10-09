// Lovely snippet from: https://stackoverflow.com/questions/45194598/using-process-env-in-typescript

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_HEAD_REF: string;
      GITHUB_BASE_REF: string;
      GITHUB_REF: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
