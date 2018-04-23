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
	Url: "/api/profile", Form: {Password:"",NewPassword:"",ConfirmPassword:""},
	saveForm:function(){

	},
	viewForm:function(ID){
		page.Form.ID = 0; switchPageMode(page, "view");
	},
	oninit: function() {
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
		// document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red shadow-4 z-5 cf tc relative fixed top-0"},[
			m("a",{class:"link",href:"/patient"},[
				m(Icons,{name:"dashboard",class:"absolute dark-red h1 dim left-0 top-0 pa3"})
			]),
			m("p", {class:"avenir"}, "BILLS"),
			m(Icons,{name:"pencil",class:"absolute dark-red h1 dim right-0 top-0 pa3",onclick:page.saveForm}),
		])
	)}},
	oncreate:function(){ page.viewForm(0) },
	view:function(){
	return  (
		<section class="bg-light-blue min-vh-100">

			<div id="appAlert"></div>
			<div class="cf w-100 pv2"></div>

			<div class="cf center w-100 w-90-m w-40-l pv2 avenir near-white">



			</div>


			{m("div",{class:"cf w-100 pv5"})}

			{m("nav",{class:"avenir w-100 z-max fixed bg-white bt b--near-white bottom-0 tc center"},[
				m(footerItem,{color:"black-60 hover-red", href:"/patient/bills",icon:"file"},"Bills"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/patient",icon:"person"},"Patient"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/facesheet",icon:"spreadsheet"},"Cross Over"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/careteam",icon:"people"},"Care Team"),
			])}
		</section>
	)
  }
}

export default page;
