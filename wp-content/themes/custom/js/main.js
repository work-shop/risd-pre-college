"use strict";

global.$ = global.jQuery;

import { toggleState } from './toggle-state.js';
import { jumpLinks } from './jump-links.js';
import { overlay } from './overlay.js';
import { collapsibleSubsections } from './collapsible-subsections.js';
import { slideshow } from './slideshow.js';
import { student_work_grid } from './student-work-grid.js';
import { breakpoints } from './breakpoints.js';
import { config } from './config.js';
import { livereload } from './livereload-client.js';

console.log('main.js loaded');

livereload();
breakpoints( config.breakpoints );

toggleState( config.toggleStateMenu );
toggleState( config.toggleStateSearch );
toggleState( config.toggleStateSidebar );

jumpLinks( config.jumpLinks );
overlay( config.overlay );

slideshow( config.slideshow );
student_work_grid( config.studentWorkGrid );

collapsibleSubsections( config.collapsibleSubsections );
