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
	Url: "/api/help", Form: {Password:"",NewPassword:"",ConfirmPassword:""},
	saveForm:function(){
		if (page.Form.Password == "") { appAlert([{ message: "Currrent Password is required" }]); return }
		if (page.Form.NewPassword !== page.Form.ConfirmPassword) { appAlert([{ message: "New and Confirm Passwords do not match" }]); return }
		saveForm(page);
	},
	viewForm:function(ID){
		// page.Form.ID = 0; switchPageMode(page, "view");
	},
	oninit: function() {
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
		// document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 white-90 z-5 cf tc relative fixed top-0 bg-red"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/patient"},[
					m(Icons,{name:"home",class:"fl white-90 h1 dim top-0 pv3 ph2"})
				]),
				m("p", {class:"dib avenir"}, "GET HELP"),
				m("a",{class:"fr link",href:"/patient/userguides"},[
					m(Icons,{name:"book",class:"white-90 h1 dim fr top-0 pa3"}),
				]),
			]))
	)}},
	oncreate:function(){ page.viewForm(0) },
	view:function(){
	return  (
		<section class="w-100 mw6 center">

			<div id="appAlert"></div>
			{m("div",{class:"cf w-100 pv3"})}

			<div class="pa3 cf">


				{m("div",{class:"cf w-100 pv3"})}

		    <div class="cf w-100 center">

		      <input type="hidden" id="ipaddress" error="IP-Address is required" value={page.IpAddress}/>
		      <input type="hidden" id="useragent" error="User-Agent is required" value={page.UserAgent}/>

					<div  class="fl pa2 w-100">
						Request help below:
					</div>

		      <div  class="fl pa2 w-100">
		      {m("select",{ class: "pa2", onchange: m.withAttr("value",function(value) {page.Form.Code = value})},
		        [m("option",{value:""},"--select issue--"), m("option","Technical"), m("option","Non-Technical")])}
		      </div>

		      <div class="fl pa2 w-100">
		        <textarea name="message" rows="7" id="message" class="w-100 pa2" placeholder="Message" error="Message is too short"></textarea>
		      </div>

					{m("div",{class:"fl w-100 tc center pv4"},
						m("span", {class:"grow no-underline fw4 pa1 br1 shadow-4 bg-primary near-white"},"SEND REQUEST")
					)}

		    </div>

		  </div>



			{m("div",{class:"cf w-100 pv4"})}



		</section>
	)
  }
}

export default page;
