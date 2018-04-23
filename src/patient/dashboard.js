import m from 'mithril';

import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';

import Icons from  '../#icons.js';
import {appAlert} from '../#utils.js';
import {checkRedirect} from '../#utils.js';

import {getData} from '../#pageFunctions.js';
import {uploadPDF} from '../#pageFunctions.js';
import {defaultImage} from '../#pageFunctions.js';

import {pageSearchList} from '../#pageComponents.js';


var page = {
	Url: "/api/dashboard", Form: {}, searchXHR: null,
	getData: function(){
		return m.request({ method: 'GET', url: page.Url, data: {id: page.Form.ID}, }).then(function(response) {
			checkRedirect(response);
			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					page.Form = response.Body;
				}
			}
			if (response.Message !== null && response.Message !== undefined && response.Message !== "" ){
				appAlert([{message: response.Message}]);
			}
		}).catch(function(error) {
			appAlert([{message: "Network Connectivity Error \n Please Check Your Network Access \n"+error, }]);
		});
	},

	oninit:function(){
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 white-90 z-5 cf tc relative fixed top-0 bg-blue"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/logout"},[
					m(Icons,{name:"logout",class:"fl white-90 h1 dim top-0 pv3 ph2"}),
				]),
				m("img", {class:"ma2 tracked fw5", src:"../../assets/img/logoWhite.png", height:"31px"}),
				m("a",{class:"fr link",href:"/patient/profile"},[
					m(Icons,{name:"person",class:"white-90 h1 dim top-0 pa3"})
				]),
			]))
	)}},
	oncreate:function(){page.getData(); defaultImage("Image")},
	view:function(vnode){
	return  (
		<section class="w-100 mw6 center pt3">

			<div id="appAlert"></div>

			{m("div",{class:"cf w-100 pv3"})}


			<div class="dt w-100 center pa3 bg-blue near-white avenir">
			  <div class="dtc v-top  ">
					{m("img",{class: "center br2 dib pa1 ba b--white-30 w3 pointer", id: "Image", src:page.Form.Image,
						onerror: m.withAttr("id",function(id){defaultImage(id)})
					})}

			    <p class="lh-copy mv0 dib v-top ph2">
						<span class="f6 db"> {page.Form.Fullname} </span>
						<span class="f7 db i">username: {page.Form.Username} </span>
						<span class="f7 db">{page.Form.Email}</span>
						<span class="f7 db">{page.Form.Mobile}</span>
						<span class="f7 db">{page.Form.Description}</span>
			    </p>
			  </div>
			</div>


			<div class="cf w-100 center avenir">
				<ul class="pa0 list center">
					<a href="/patient/patientlists/capture" class="black-60 no-underline">
				  <li class="flex items-center lh-copy pa3  bb b--black-10">
			      <Icons name="clipboard" class=" h2 "/>
			      <div class="pl3 flex-auto">
			        <span class="f5 db">Book Appointment</span>
			      </div>
					</li>
					</a>

					<a href="/patient/facesheets/capture" class="black-60 no-underline">
				  <li class="flex items-center lh-copy pa3  bb b--black-10">
			      <Icons name="file" class=" h2 "/>
			      <div class="pl3 flex-auto">
			        <span class="f5 db">Check Schedule</span>
			      </div>
					</li>
					</a>

					<a href="/patient/messages" class="black-60 no-underline">
					<li class="flex items-center lh-copy pa3  bb b--black-10">
						<Icons name="envelope-closed" class=" h2 "/>
			      <div class="pl3 flex-auto">
			        <span class="f5 db">Messages <span class="b">(2)</span></span>
			      </div>
				  </li>
					</a>

					<a href="/patient/userguides" class="black-60 no-underline">
					<li class="flex items-center lh-copy pa3 bb b--black-10">
						<Icons name="book" class=" h2 "/>
			      <div class="pl3 flex-auto">
			        <span class="f5 db">User Guides</span>
			      </div>
					</li>
					</a>

				</ul>
			</div>

			{m("div",{class:"cf w-100 pv4"})}

			{m("nav",{class:"avenir w-100 mw6 z-max fixed bg-white bt bl b--light-gray bottom-0 tc center"},[
				m(footerItem,{color:"black-60 hover-red", href:"/patient/facesheets",icon:"spreadsheet"},"Face Sheets"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/patientlists",icon:"people"},"Patient Lists"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/cotcodes",icon:"medical-cross"},"CPT Codes"),
				m(footerItem,{color:"black-60 hover-red", href:"/patient/bills",icon:"file"},"Super Bills"),
			])}

		</section>
	)},
}

export default page;
