var m = require("mithril")

//Website Routes
import termsPage from './terms.js';
import privacyPage from './privacy.js';

import teamPage from './team.js';
import indexPage from './index.js';
import votePage from './vote.js';

// import signupPage from './signup.js';
// import connectPage from './connect.js';

// import emailPage from './email.js';
// import forgotPage from './forgot.js';


// import votesPage from './votes.js';
// import candidatesPage from './candidates.js';
// import listVoterPage from './listvoter.js';
// import listEventPage from './listevent.js';

// import tutorialPage from './tutorial.js';

// "/login":{ view: function() { return m(connectPage)},},
// "/logout":{ view: function() { return m(connectPage)},},
// "/email":{ view: function() { return m(emailPage)},},
// "/forgot":{ view: function() { return m(forgotPage)},},
// "/signup":{ view: function() { return m(signupPage)},},

m.route.prefix("")
m.route(document.getElementById('appContent'), "/", {
	"/terms":{ view: function() { return m(termsPage)},},
	"/privacy":{ view: function() { return m(privacyPage)},},

	"/":{ view: function() { return m(indexPage)},},
	"/vote":{ view: function() { return m(votePage)},},
	"/team":{ view: function() { return m(teamPage)},},

});
