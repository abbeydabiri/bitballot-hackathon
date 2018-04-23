import m from 'mithril';

import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';

import Icons from '../#icons.js';
import {appAlert} from '../#utils.js';
import {checkRedirect} from '../#utils.js';

import {getData} from '../#pageFunctions.js';
import {defaultImage} from '../#pageFunctions.js';

import {pageSearchList} from '../#pageComponents.js';
import {switchPageMode} from '../#pageFunctions.js';



var page = {
	Url: "/api/profile", Form: {},
	lastActivityComponent : { view:function(vnode){ return(
		<div class="cf f6">
			{vnode.attrs.lastActivityList}
		</div>
	)}},
	lastActivityItem: {view: function(vnode) {return(
		<div class="pa2 bb b--washed-red">
			<small style="font-size:80%" class="truncate">
				{vnode.attrs.Date}
			</small>
			<span class="db truncate hover-dark-red pointer" onclick={vnode.attrs.View}>
				<b>{vnode.attrs.POS}</b> - {vnode.attrs.Details}
			</span>
			<small style="font-size:80%" class="truncate db">
				{vnode.attrs.SubDetails}
			</small>
		</div>
	)}},
	getData: function(){
		return m.request({ method: 'GET', url: page.Url, data: {id: page.Form.ID}, }).then(function(response) {
			checkRedirect(response);
			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					page.Form = response.Body;
					page.lastActivity();
				}
			}
			if (response.Message !== null && response.Message !== undefined && response.Message !== "" ){
				appAlert([{message: response.Message}]);
			}
		}).catch(function(error) {
			appAlert([{message: "Network Connectivity Error \n Please Check Your Network Access \n"+error, }]);
		});
	},
	lastActivity: function(){
		var lastActivityList = [];
		m.request({ method: 'GET', url: "/api/hits/search?limit=25&field=code&search="+page.Form.Username, }).then(function(response) {
			checkRedirect(response);
			if (response.Code == 200) { if (response.Body !== null && response.Body !== undefined ){
				var POS = 1;
				response.Body.map(function(result) {
					if (result.ID > 0) {
						POS++
						lastActivityList.push(m(page.lastActivityItem,
							{Details: result.Details, SubDetails: result.SubDetails, Date: result.Date,}
						))
					}
				})
			}}
			page.lastActivityList = m(page.lastActivityComponent,{lastActivityList: lastActivityList});

			if (response.Message !== null && response.Message !== undefined && response.Message !== "" ){
				appAlert([{message: response.Message}]);
			}
		}).catch(function(error) {
			appAlert([{ message: "Network Connectivity Error \n Please Check Your Network Access", }]);
		});
	},
	oninit:function(){page.lastActivityList = m(page.lastActivityComponent);
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
		// document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 bg-secondary dark-red shadow-4 z-5 cf tc relative fixed top-0"},[
			m("a",{class:"link",href:"/patient"},[
				m(Icons,{name:"dashboard",class:"absolute dark-red h1 dim left-0 top-0 pa3"})
			]),
			m("p", {class:"avenir"}, "SECURITY LOG"),
		])
	)}},
	oncreate:function(){ page.getData();defaultImage("Image")},
	view:function(){
	return  (
		<section class="">

			<div id="appAlert"></div>

			<div class="bg-primary">
				<div class="cf center w-100 w-90-m w-40-l pv2 avenir near-white">

					<div class="dark-red ph2">
						<div class="cf center w-100 w-90-m w-40-l  avenir near-white">

							<div class="tc w-100 pv2">
								{m("img",{class: "br-100 pa1 ba b--white-10 h4 w4 pointer", style:"", id: "Image", src:page.Form.Image,
									onerror: m.withAttr("id",function(id){defaultImage(id)})
								})}
								<p class="mv1 fw4"> {page.Form.Fullname} </p>
								<small class="">{page.Form.Username}</small>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div class="cf center ph2 w-100 w-90-m w-40-l avenir near-white ">
				<div class="cf mt2 bg-white-10 br2 br--top pt1 bg-primary">
					<span class="flex pa1 items-center f6 white-80">
						<Icons name="spreadsheet" class="h1 pr1"/>
						Security Log
					</span>
				</div>
				<div class="cf ph1 f6 bg-white-90 black-80">
					{page.lastActivityList}
				</div>
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
