import m from 'mithril';

import menu from './#menu.js';
import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';


import Icons from '../#icons.js';
import {pageTitle} from '../#pageComponents.js';


import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';
import {appAlert} from '../#utils.js';



var page = {
	Url: "/api/profile/password", Form: {Password:"",NewPassword:"",ConfirmPassword:""},
	saveForm:function(){
		if (page.Form.Password == "") { appAlert([{ message: "Currrent Password is required" }]); return }
		if (page.Form.NewPassword !== page.Form.ConfirmPassword) { appAlert([{ message: "New and Confirm Passwords do not match" }]); return }
		saveForm(page);
	},
	viewForm:function(ID){
		page.Form.Password = "";
		page.Form.NewPassword = "";
		page.Form.ConfirmPassword = "";
		page.Form.ID = 0; switchPageMode(page, "view");
	},
	oninit: function() {
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
		// document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/patient/profile"},[
					m(Icons,{name:"chevron-left",class:"fl dark-red h1 dim pa3"})
				]),
				m("p", {class:"dib avenir"}, "CHANGE PASSWORD"),
				m(Icons,{name:"check",class:"fr dark-red h1 dim pa3",onclick:page.saveForm}),
			]))
	)}},
	oncreate:function(){ page.viewForm(0) },
	view:function(){
	return  (
		<section class=" min-vh-100 pt3">

			<div id="appAlert"></div>

			<article class="absolute vh-75 dt w-100">
				<div class="dtc v-mid tc black items-center w-100">



					{m("div",{class:"cf w-100 pv3"})}

					<div class="cf center w-100 w-90-m w-40-l pa2 avenir near-white">

						<div class="cf w-100">
							<div class="fl w-100 pa2"> <span class="black-60">Current Password:</span>
								{m("input",{ type: "password", class: "w-100 pa2", value:page.Form.Password, onchange: m.withAttr("value",function(value) {page.Form.Password = value}) })}
							</div>
							{m("div",{class:"cf w-100 pv3"})}
							<div class="fl w-100 pa2"> <span class="black-60">New Password:</span>
								{m("input",{ type: "password", class: "w-100 pa2", value:page.Form.NewPassword, onchange: m.withAttr("value",function(value) {page.Form.NewPassword = value}) })}
							</div>
							{m("div",{class:"cf w-100 pv3"})}
							<div class="fl w-100 pa2"> <span class="black-60">Confirm Password:</span>
								{m("input",{ type: "password", class: "w-100 pa2", value:page.Form.ConfirmPassword, onchange: m.withAttr("value",function(value) {page.Form.ConfirmPassword = value}) })}
							</div>
						</div>

					</div>
				</div>
			</article>

			{m("div",{class:"cf w-100 pv5"})}


		</section>
	)
  }
}

export default page;
