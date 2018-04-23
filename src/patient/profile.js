import m from 'mithril';

import menu from './#menu.js';
import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';


import Icons from '../#icons.js';
import {pageTitle} from '../#pageComponents.js';
import {defaultImage} from '../#pageFunctions.js';
import {displayImage} from '../#pageFunctions.js';

import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';


var page = {
	Url: "/api/profile", Form: {},
	editForm:function(){
		switchPageMode(page, "edit");
		m.render(document.getElementById('appMenu'), m(page.editHeader));
	},
	viewForm:function(){
		switchPageMode(page, "view");
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
	},
	saveForm:function(){ saveForm(page); },
	oninit: function() {
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
		// document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	oncreate:function(){ switchPageMode(page, "view"); defaultImage("Image")},
	editHeader: {
		view: function(vnode){
			return (
				m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
					m("div", {class:"w-100 mw6 center"},[
						m(Icons,{name:"person",class:"fl dark-red h1 dim pa3 pointer",onclick:page.viewForm}),
						m("p", {class:"dib avenir"}, "EDIT MY PROFILE"),
						m(Icons,{name:"check",class:"fr dark-red h1 dim pa3",onclick:page.saveForm}),
				]))
			)
		}
	},
	viewHeader: {
		view: function(vnode){
			return (
				m("nav",{class:"w-100 bg-secondary dark-red z-5 cf tc relative fixed top-0"},
					m("div", {class:"w-100 mw6 center"},[
						m("a",{class:"link",href:"/patient"},[
							m(Icons,{name:"home",class:"fl dark-red h1 dim pa3"})
						]),
						m("p", {class:"dib avenir"}, "MY PROFILE"),
						m(Icons,{name:"pencil",class:"fr dark-red h1 dim pa3 pointer",onclick:page.editForm}),
				]))
			)
		}
	},
	view:function(){
	return  (
		<section class=" min-vh-100 pt3">

			<div id="appAlert"></div>
			{m("div",{class:"cf w-100 pv3"})}

			<section id="formView" class={"cf center w-100 w-90-m w-40-l pv2 avenir near-white "+page.formView}>

				<div class="fl w-100 ">
					<header class="tc pv2">
						{m("input",{ type:"file", disabled: page.editMode, class: "dn", id: "imageFile",value: "",
							onchange: function(event){displayImage(event, page.Form, "Image")}})}
						{m("img",{class: "br2 pa1 ba b--light-gray w4 pointer", style:"", id: "Image", src:page.Form.Image,
							onerror: m.withAttr("id",function(id){ defaultImage(id); }),
							onclick:function(){document.getElementById("imageFile").click()}
						})}

						<h2 class="f5 f4-ns fw4 mid-gray pb0 mb0"> {page.Form.Fullname} </h2>
						<h2 class="f7 gray fw3 tracked i pt0 mt0">username: {page.Form.Username} </h2>
					</header>
				</div>


				<div class="fl w-100 gray">
					<div class="cf w-100 pa2 f6 fw5">
						Private Details
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

				{m("div",{class:"cf w-100 pv1"})}

				{m("div",{class:"cf w-100 tc center pv4"},
					m("a", {href:"/patient/password", class:"grow no-underline f7 fw4 pa1 br2 bg-primary near-white"},"change password")
				)}

			</section>


			{m("div",{class:"cf w-100 pv5"})}


		</section>
	)
  }
}

export default page;
