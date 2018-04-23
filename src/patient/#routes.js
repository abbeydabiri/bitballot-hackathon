var m = require("mithril")

//Dashboard Routes
import pageDashboard from './dashboard.js';
import pagePassword from './password.js';
import pageProfile from './profile.js';
import pageHistory from './history.js';

import pageFacesheets from './facesheets.js';
import pagePatientlists from './patientlists.js';
import pageSuperbills from './superbills.js';
import pageCptcodes from './cptcodes.js';


import pageHelp from './help.js';
import pageTasks from './tasks.js';
import pageMessages from './messages.js';
import pageUserguides from './userguides.js';



m.route.prefix("")
m.route(document.getElementById('appContent'), "/patient", {
	"/patient/":{ view: function() { return  m(pageDashboard)},},

	"/patient/facesheets":{ view: function() { return  m(pageFacesheets)},},
	"/patient/facesheets/capture":{ view: function() { return  m(pageFacesheets,{capture:true})},},
	"/patient/patientlists":{ view: function() { return  m(pagePatientlists)},},
	"/patient/patientlists/capture":{ view: function() { return  m(pagePatientlists,{capture:true})},},
	"/patient/superbills":{ view: function() { return  m(pageSuperbills)},},
	"/patient/cptcodes":{ view: function() { return  m(pageCptcodes)},},

	"/patient/profile":{ view: function() { return  m(pageProfile)},},

	"/patient/password":{ view: function() { return  m(pagePassword)},},

	"/patient/history":{view: function() {return  m(pageHistory)},},


	"/patient/help":{view: function() {return  m(pageHelp)},},
	"/patient/tasks":{view: function() {return  m(pageTasks)},},
	"/patient/messages":{view: function() {return  m(pageMessages)},},
	"/patient/userguides":{view: function() {return  m(pageUserguides)},},
});
