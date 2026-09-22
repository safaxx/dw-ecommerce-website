//import { resolve } from "nodemailer/lib/shared/url.js";

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", src);

    scriptEle.onload = () => resolve(true);
    scriptEle.onerror = () => resolve(false);

    document.body.appendChild(scriptEle);
  });
};
