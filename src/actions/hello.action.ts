import { Action } from "../shared/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const helloAction: Action = (message: any) => {
  return async (c) => {
    console.log(message);
    return c.json({
      type: 1,
      data: {
        content: "Hello, World!",
      },
    });
  };
};
