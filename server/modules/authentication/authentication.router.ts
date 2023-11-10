import { Router } from "express";
import { validateRequest } from "../../middlewares/requestValidator";
import { RegistrationSchema } from "../../common/schemas/registration";
import * as authenticationController from "./authentication.controller";
import { LoginSchema } from "../../common/schemas/login";
const router = Router();

router.post(
  "/registration",
  validateRequest({
    body: RegistrationSchema,
  }),
  authenticationController.registration
);

router.post(
  "/login",
  validateRequest({
    body: LoginSchema,
  }),
  authenticationController.login
);

export default router;
