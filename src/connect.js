import m from 'mithril';
import menu from './#menu.js';
import {appAlert} from './#utils.js';
import {uportConnect, globalState, setStatus, sendEther} from './#uPort.js';

var page = {Form: {Username:"", Password:""},
	submit: function() {
		if (page.Form.Username.length == 0) { appAlert([{ message: "Username is required" }]); return }
		if (page.Form.Password.length == 0) { appAlert([{ message: "Password is required" }]); return }

		startLoader();
		m.request({ method: 'POST', url: "/api/login", data: page.Form, }).then(function(response) {

			var lStoploader = true;
			if (response.Body !== null && response.Body !== undefined) {
				if (response.Body.Redirect !== undefined && response.Body.Redirect !== null &&
					response.Body.Redirect !== "") {
					window.location.href = response.Body.Redirect
					lStoploader = false;
				}
			}
			appAlert([{ message: response.Message }]);
			if(lStoploader) { stopLoader();}
		}).catch(function(error) {
			appAlert([{ message: error }]);
			stopLoader();
		});
	},
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"white"}))
	},
	view:function(vnode){
		return (
			<article class="vh-100 dt w-100 bg-primary">
				<div id="appAlert"></div>
				<div class="dtc v-mid tc white ph3 ph4-l">

					<section class="mw9-ns center pa2 near-white flex flex-row justify-center">
						<div class="dt w-100 w-60-m w-30-l">
							<div class=" pa3 w-100 ">
								<div class="f6 cf">

									<div class="f5 tracked fw5 fl">
										<h1 class="f3 f2-l fw3 mb3 mt4 mt0-ns"><label class="fw6">bitBallot</label></h1>
										<h2 class="f6 f5-l fw3 mb2 mb4-l lh-title">
											is a blockchain-based digital voting solution.
										</h2>
									</div>

									<input type="hidden" id="action"/>

									<div class="pv2 tc">
 										<button class="bg-secondary bn near-white shadow-4 pointer fl w-100 dim pv3 br2" onclick={page.submit}>Connect with uPort » </button>
 									</div>

									<div class="cf mv4"></div>

									<div class="pv2 tc">
										<a href="/login/email" oncreate={m.route.link}>
											<button class="bg-secondary bn near-white shadow-4 pointer fl w-100 dim pv3 br2">Connect with eMail » </button>
										</a>
									</div>
								</div>
							</div>

							<div class="center f6 bottom-0">
								<small class="near-white">
									Dont have an account? <a href="/signup" oncreate={m.route.link} class="near-white no-underline ph1 br1">Sign up  today</a>
								</small>
							</div>
						</div>
					</section>

				</div>
			</article>
		)
	}
}

export default page;
