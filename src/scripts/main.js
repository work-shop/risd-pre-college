"use strict";

import { toggleClass } from "./toggle-class.js";
import { jumpLinks } from "./jump-links.js";

console.log('main.js loaded');

toggleClass({ selector: "#sidebar", action: "click", toggledClass: "open" });
jumpLinks({ headerHeight: 60, transitionDuration: 350, headerPadding: 30 });
