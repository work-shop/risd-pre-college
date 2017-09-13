"use strict";

import { toggleClass } from "./toggle-class.js";

console.log('main.js loaded');

toggleClass({ selector: "#sidebar", action: "click", toggledClass: "open" });
