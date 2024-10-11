import { heroText, introText } from "./home";
import { menuText, discText } from "./menu";
import { contactText, contactInfo } from "./contact";

let content = document.querySelector("#content");
(function defaultLoad() {
    content.appendChild(heroText);
    content.appendChild(introText);
})();


const homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    content.appendChild(heroText);
    content.appendChild(introText);
});
const menuBtn = document.querySelector("#menu");
menuBtn.addEventListener("click", () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    content.appendChild(menuText);
    content.appendChild(discText);
});

const contactBtn = document.querySelector("#contact");
contactBtn.addEventListener("click", () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    content.appendChild(contactText);
    content.appendChild(contactInfo);
});
