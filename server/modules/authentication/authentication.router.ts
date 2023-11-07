import { Router } from "express";
import { validateRequest } from "../../middlewares/requestValidator";
import { RegistrationSchema } from "../../common/schemas/registration";
import * as authenticationController from "./authentication.controller";
const router = Router();

router.post(
  "/registration",
  validateRequest({
    body: RegistrationSchema,
  }),
  authenticationController.registration
);

export default router;
