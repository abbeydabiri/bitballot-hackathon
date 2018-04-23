import m from 'mithril';
import menu from './#menu.js';
import {appAlert} from './#utils.js';


var page = { FormOne:"", FormTwo:"dn", Form: {Firstname:"", Lastname:"", Username:"",
	Password:"", ConfirmPassword:"", Email:""},
	gotoOne: function() { page.FormOne="", page.FormTwo="dn"; },
	gotoTwo: function() {
		if (page.Form.Firstname.length == 0) { appAlert([{ message: "First Name is required" }]); return }
		if (page.Form.Firstname.length < 3) { appAlert([{ message: "First Name is too short" }]); return }

		if (page.Form.Lastname.length == 0) { appAlert([{ message: "Last Name is required" }]); return }
		if (page.Form.Lastname.length < 7) { appAlert([{ message: "Last Name is too short" }]); return }

		if (page.Form.Email.length == 0) { appAlert([{ message: "Email is required" }]); return }
		if(!page.Form.Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			appAlert([{ message: "Email is invalid" }]); return
		}

		page.FormOne="dn", page.FormTwo="";
	},
	submit: function() {
		if (page.Form.Username.length == 0) { appAlert([{ message: "Username is required" }]); return }
		if (page.Form.Username.length < 3) { appAlert([{ message: "Username is too short" }]); return }

		if (page.Form.Password.length < 3) { appAlert([{ message: "Password must be at least 4 chars" }]); return }
		if (page.Form.ConfirmPassword.length < 3) { appAlert([{ message: "Confirm Password must be at least 4 chars" }]); return }
		if (page.Form.Password !== page.Form.ConfirmPassword) { appAlert([{ message: "Password does not match" }]); return }

		startLoader();
		m.request({ method: 'POST', url: "/api/signup", data: page.Form, }).then(function(response) {

			var lStoploader = true;
			if (response.Body !== null) {
				if (response.Body.Redirect !== null &&  response.Body.Redirect !== "") {

					lStoploader = false;
					m.request({ method: 'POST', url: response.Body.Redirect, data: page.Form, }).then(function(responseSub) {
						var lStoploaderSub = true;
						if (responseSub.Body !== null) {
							if (responseSub.Body.Redirect !== null &&  responseSub.Body.Redirect !== "") {
								window.location.href = responseSub.Body.Redirect
								lStoploaderSub = false;
							}
						}
						appAlert([{ message: response.Message }]);
						if(lStoploaderSub) { stopLoader();}
					}).catch(function(error) {
						appAlert([{ message: error }]);
						stopLoader();
					});
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
		m.render(document.getElementById('appMenu'), m(menu,{color:"near-white"}))
	},
	view:function(vnode){
		return (
			<article class="vh-100 dt w-100 bg-primary">
				<div id="appAlert"></div>
				<div class="dtc v-mid tc ph3 ph4-l">

					<section class="mw9-ns center pa2 near-white flex flex-row justify-center">
						<div class="dt w-100 w-60-m w-30-l">
							<div class=" pa3 w-100 ">
								<div class="f6 avenir cf">

									<div class="pb3 f5 tracked fw5 fl">
										Sign Up!
									</div>

									<input type="hidden" id="action"/>

									<span class={"cf w-100 "+page.FormOne}>
										{m("input",{ placeholder: "First Name", type:"text", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.Firstname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoTwo}}
										})}
										<div class="cf mv2"></div>

										{m("input",{ placeholder: "Last Name", type:"text", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.Lastname = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoTwo}}
										})}
										<div class="cf mv2"></div>

										{m("input",{ placeholder: "Email", type:"email", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.Email = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoTwo}}
										})}
										<div class="cf mv1"></div>

										<div class="pv2 tc">
											<span class="bg-secondary dark-red shadow-4 pointer fl w-100 dim pv3 br1" onclick={page.gotoTwo}>Next » </span>
										</div>
										<div class="cf mv1"></div>
									</span>


									<span class={"cf w-100 "+page.FormTwo}>
										{m("input",{ placeholder: "Username", type:"text", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.Username = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoTwo}}
										})}
										<div class="cf mv2"></div>
										{m("input",{ placeholder: "Enter Password", type:"password", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.Password = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoThree}}
										})}

										<div class="cf mv2"></div>

										{m("input",{ placeholder: "Confirm Password", type:"password", class: "red w-100 ba b--light-gray bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.ConfirmPassword = value}),
											onkeyup: function(event) {if(event.key=="Enter"){page.gotoThree}}
										})}

										<div class="cf mv1"></div>

										<div class="pv2 tc">
											<span class="bg-secondary dark-red shadow-4 pointer fl w-40 dim pv3 br1" onclick={page.gotoOne}>Back</span>
											<span class="bg-secondary dark-red shadow-4 pointer fr w-40 dim pv3 br1" onclick={page.submit}>Submit » </span>
										</div>
										<div class="cf mv1"></div>
									</span>



								</div>
							</div>

							<div class="center f6 bottom-0">
								<small class="near-white">
									Have an account? <a href="/login" oncreate={m.route.link} class="near-white no-underline ph1 br1">Log me in </a>
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
