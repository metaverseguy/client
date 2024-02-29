import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const YOUR_RECAPTCHA_KEY = "6LewY4MpAAAAAA725yBsZur8diim8iXLCN1hAHi2";

// Define the shape of your components' props
interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onChange }) => {
  return <ReCAPTCHA sitekey={YOUR_RECAPTCHA_KEY} onChange={onChange} />;
};

export default ReCaptcha;
