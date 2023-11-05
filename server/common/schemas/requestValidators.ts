import { AnyZodObject } from "zod";
export interface RequestValidators {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  authorization?: true;
}
