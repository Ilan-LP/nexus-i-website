import { Router } from "express";
import { healthCheck, submitContact, submitMeeting } from "../controllers/contactController.js";
import { createSubmissionLimiter } from "../middleware/rateLimiter.js";
import { validateContactRequest, validateMeetingRequest } from "../middleware/validateRequest.js";

const router = Router();
const submissionLimiter = createSubmissionLimiter();

router.get("/health", healthCheck);
router.post("/contact", submissionLimiter, validateContactRequest, submitContact);
router.post("/meeting", submissionLimiter, validateMeetingRequest, submitMeeting);

export default router;
