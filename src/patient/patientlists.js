import m from 'mithril';

import menu from './#menu.js';
import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';


import Icons from '../#icons.js';
import {pageTitle} from '../#pageComponents.js';
import {uploadPDF} from '../#pageFunctions.js';

import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';
import {appAlert} from '../#utils.js';



var page = {
	Url: "/api/facesheet", Form: {PDF:""}, formView : "dn",
	formViewDownload: "dn", formViewUpload: "dn", formViewCaptured: "dn",
	searchForm:function(){
		m.render(document.getElementById('appMenu'), m(page.searchHeader));
		switchPageMode(page, "search");
	},
	searchHeader: {view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/patient"},[
					m(Icons,{name:"home",class:"fl dark-red h1 dim pa3"})
				]),
				m("p", {class:"dib avenir"}, "SEARCH PATIENT LIST"),
				m(Icons,{name:"camera-slr",class:"fr dark-red h1 dim pa3 pointer",onclick:page.newForm}),
		]))
	)}},
	newForm:function(){
		page.formViewUpload = "";
		page.formViewDownload = "dn";
		page.formViewCaptured = "dn";
		page.Form.ID = 0; switchPageMode(page, "new");
		m.render(document.getElementById('appMenu'), m(page.newHeader));
	},
	newHeader: {view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/patient"},[
					m(Icons,{name:"home",class:"fl dark-red h1 dim pa3"})
				]),
				m("p", {class:"dib avenir"}, "NEW PATIENT LIST"),
				m(Icons,{name:"magnifying-glass",class:"fr dark-red h1 dim pa3 pointer",onclick:page.searchForm}),
		]))
	)}},
	editForm:function(){
		// if(ID>0){page.Form.ID = ID} switchPageMode(page, "edit");
		page.formViewUpload = "";
		page.formViewDownload = "dn";
		page.formViewCaptured = "";
		m.render(document.getElementById('appMenu'), m(page.editHeader));
	},
	editHeader: {view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
			m("div", {class:"w-100 mw6 center"},[
				m(Icons,{name:"chevron-left",class:"fl dark-red h1 dim pa3 pointer",onclick:page.viewForm}),
				m("p", {class:"dib avenir"}, "EDIT PATIENT LIST"),
				m(Icons,{name:"magnifying-glass",class:"fr dark-red h1 dim pa3 pointer",onclick:page.searchForm}),
		]))
	)}},
	viewForm:function(){
		// if(ID>0){page.Form.ID = ID} switchPageMode(page, "view");
		page.formViewUpload = "dn";
		page.formViewDownload = "";
		page.formViewCaptured = "";
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
	},
	viewHeader: {view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
			m("div", {class:"w-100 mw6 center"},[
				m(Icons,{name:"camera-slr",class:"fl dark-red h1 dim pa3 pointer",onclick:page.newForm}),
				m("p", {class:"dib avenir"}, "VIEW PATIENT LIST"),
				m(Icons,{name:"pencil",class:"fr dark-red h1 dim pa3 pointer",onclick:page.editForm}),
		]))
	)}},
	captureFacesheet: function(){ page.viewForm() },
	saveForm:function(){ saveForm(page); },
	oninit: function(vnode) {
		if (vnode.attrs.capture) { page.newForm(); } else { page.searchForm(); }
	},
	oncreate:function(){ },
	view:function(){
	return  (
		<section class="w-100 mw6 center">

			<div id="appAlert"></div>
			{m("div",{class:"cf w-100 pv3"})}


			<div class={page.searchView}>
				<div class="pa3 cf">
					<span class="dt btnPrimary mv2 center br2">
						{m("input",{type:"hidden",id:"searchField"})}
						{m("input",{class:"f6 fl bn black-80 bg-near-white pa2 w5", id:"searchText",placeholder:"search", type:"text",
						onchange: m.withAttr("value",function(value) {page.searchText = value}) })}
						<Icons name="magnifying-glass" class="h1 w1 button-reset dim fl pa2 tc white pointer br2" onclick={page.searchForm} />
					</span>
				</div>

				<ul class="list pl0 mt0 measure center cf">
					{page.pageSearchList}
				</ul>
			</div>


			<div class={page.formView}>

				<div class="pv4 cf w-100"></div>


				<header class="tc pv2">
					<span class={page.formViewUpload}>
						{m("input",{ type:"file", class: "dn", id: "patientlistFile",value: "",
							onchange: function(event){uploadPDF(event, page.Form, "PDF")}})}
						<Icons name="camera-slr" class="h3 bg-primary br-100 grow pa2 near-white pointer br2"
						onclick={function(){document.getElementById("patientlistFile").click()}} />
						<small class="db gray i">click to capture or</small>
						<small class="db gray i">upload pdf/image</small>
					</span>

					<span class={page.formViewDownload}>
						<a target="_blank" class="link no-underline" href="">
							<Icons name="cloud-download" class="h3 bg-primary br-100 grow pa2 near-white pointer br2" />
							<small class="db gray i">download patient list</small>
						</a>
					</span>

					<div class="pv1 cf w-100"></div>

					<span class="grow pointer f6 fw4 pa2 br1 bg-primary near-white" onclick={page.captureFacesheet}>
						<Icons name="camera-slr" class="h1 near-white" />
						<span class="pl2 f6 dib">Capture Patient List</span>
					</span>

				</header>



				<div class={"cf pa2 mt3 "+page.formViewCaptured}>
					<div class="cf w-100 f6 fw5 gray bb b--near-white">
						Captured Details
					</div>

					<div class="cf w-100">
						<div class="fl w-50 pa2"> <small class="gray b">Fullname:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: "disabled", value:page.Form.Fullname,
								onchange: m.withAttr("value",function(value) {page.Form.Fullname = value}) })}
						</div>

						<div class="fl w-50 pa2"> <small class="gray b">Mobile:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: page.editMode, value:page.Form.Mobile,
								onchange: m.withAttr("value",function(value) {page.Form.Mobile = value}) })}
						</div>

						<div class="fl w-100 pa2"> <small class="gray b">Email:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: page.editMode, value:page.Form.Email,
								onchange: m.withAttr("value",function(value) {page.Form.Email = value}) })}
						</div>
					</div>

					<div class="cf w-100" style="">
						<div class="fl w-100 pa2"> <small class="gray b">About Me:</small>
							{m("textarea",{ class: "w-100 h3 tl pa2 ba b--black-10", disabled: page.editMode, value:page.Form.Description,
								onchange: m.withAttr("value",function(value) {page.Form.Description = value}) })}
						</div>
					</div>
				</div>
			</div>




			{m("div",{class:"cf w-100 pv5"})}

			{m("nav",{class:"avenir w-100 mw6 z-max fixed bg-white bt bl b--light-gray bottom-0 tc center"},[
				m(footerItem,{color:"dark-red hover-black-60", href:"/patient/facesheets",icon:"spreadsheet"},"Face Sheets"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/patients",icon:"person"},"Patients"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/careteam",icon:"people"},"Care Team"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/bills",icon:"file"},"Bills"),
			])}
		</section>
	)
  }
}

export default page;
