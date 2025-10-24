import { Router } from "express";
const router = Router();

router.get("/legal/privacy", (_, res) => {
  res.json({
    title: "Privacy Policy",
    content: "This is the Quantum Charts privacy policy. We respect your privacy and comply with all applicable laws."
  });
});

router.get("/legal/terms", (_, res) => {
  res.json({
    title: "Terms of Service",
    content: "These are the Quantum Charts terms of service. Use of this platform is subject to these terms."
  });
});

export default router;
