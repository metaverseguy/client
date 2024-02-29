import fetch from "isomorphic-unfetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const USER_RESPONSE = req.body.token;
    const SECRET_KEY = "6LewY4MpAAAAAIGSiF4vfk0RClPggsgkjVTlRc4D";

    const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${USER_RESPONSE}`;

    try {
      const response = await fetch(VERIFY_URL, {
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        // reCAPTCHA verification succeeded
        res.status(200).json({ success: true });
      } else {
        // reCAPTCHA verification failed
        res.status(500).json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
