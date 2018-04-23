import m from 'mithril';

import menu from './#menu.js';
import {footerItem} from './#footer.js';

import Icons from '../#icons.js';
import {appAlert} from '../#utils.js';
import {checkRedirect} from '../#utils.js';

import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';


var viewTaskManager = {
	view: function(vnode){
		return (
			m("li",{class:"fl w-100 lh-copy pa3 ph0-l bb b--black-10"},[
				m("div",{id:vnode.attrs.id+"Task", class:"flex items-center "+vnode.attrs.color},[
					m("div",{class:"pa2 near-white "+vnode.attrs.prioritycolor ,onclick:()=>page.openTaskManager(vnode.attrs.id)},vnode.attrs.priority),
					m("div",{class:"ph2 flex-auto"},[
						m("span",{class:"f6 db black-70 truncate"},vnode.attrs.title),
						m("small",{class:"gray db i"},vnode.attrs.days),
					]),
					m("div",m(Icons,{name:"chevron-top", class:"dn w1 h1 dim", id:vnode.attrs.id+"Open",onclick:()=>page.openTaskManager(vnode.attrs.id)})),
					m("div",m(Icons,{name:"chevron-bottom", class:" w1 h1 dim", id:vnode.attrs.id+"Closed",onclick:()=>page.openTaskManager(vnode.attrs.id)}))
				]),
				m("div",{class:" fl w-100 black-70 tl dn pv2", id:vnode.attrs.id+"Message"}),
			])
		)
	}
}

var page = {
	Url: "/api/tasks", Form: {}, searchXHR: null,
	viewForm:function(){
		// switchPageMode(page, "view"); m(viewHeader);
		// m.render(document.getElementById('appMenu'), m(viewHeader));
	},
	saveForm:function(){ saveForm(page); },
	oninit: function() {
		var cookie = getCookie("bcap");
		page.jwtToken = jwt_decode(cookie);
		m.render(document.getElementById('appMenu'), m(page.viewHeader));
	},
	openTaskManager:function(id){
		document.getElementById(id+"Message").classList.toggle('dn');
		document.getElementById(id+"Closed").classList.toggle('dn');
		document.getElementById(id+"Open").classList.toggle('dn');

		var classList = document.getElementById(id+"Message").classList.value;
		var taskID = document.getElementById(id+"Task");
		if(!(classList.indexOf("dn") !== -1)){

			if(taskID.classList.value.indexOf("black") !== -1){
				taskID.classList.toggle('black');
				taskID.classList.toggle('gray');
			}

			startLoader();
			if (page.searchXHR !== null) { page.searchXHR.abort() } page.searchXHR = null;
			m.request({ method: 'GET', url: page.Url, data: {id: id},
				config: function(xhr) {page.searchXHR = xhr}, }).then(function(response) {

				checkRedirect(response);
				if (response.Code == 200) {
					if (response.Body !== null && response.Body !== undefined ){

						//Mark as Read
						m.request({ method: 'POST', url: page.Url+"/read",
						data: {TaskID: response.Body.ID, UserID: page.jwtToken.ID}},)
						//Mark as Read

						m.render(document.getElementById(id+"Message"), [
							m("small",{class:"fl gray "},"From: "+response.Body.From),
							m("small",{class:"fl gray w-100"},
							"Period: "+response.Body.Start+" - "+response.Body.Stop),
							m("div",{class:"fl w-100"},m.trust(response.Body.File)),
						]);
					}
					stopLoader();
				}
			}).catch(function(error) {
				stopLoader();
				appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
			});
		}
	},
	searchText: "",
	searchForm: function(){
		var searchList = [];
		var pageSearchUrl = page.Url+"/search?workflow=publish&search="+page.searchText
		if (page.searchXHR !== null) { page.searchXHR.abort() } page.searchXHR = null;
		m.request({ method: 'GET', url: pageSearchUrl,
			config: function(xhr) {page.searchXHR = xhr}, }).then(function(response) {

			checkRedirect(response);
			if (response.Code == 200) {
				if (response.Body !== null && response.Body !== undefined ){
					var POS = 1;
					var color = "";



					response.Body.map(function(result) { if (result.ID > 0) {

						var priority = "";
						var prioritycolor = "";
						var subDetails = result.SubDetails.split("|");

						switch(subDetails[0]) {
							default: //case "low":
								priority = "L";
								prioritycolor = "bg-green";
								break;
							case "medium":
								priority = "M";
								prioritycolor = "bg-orange";
								break;
							case "high":
								priority = "H";
								prioritycolor = "bg-red";
								break;
						}


						color = (result.Workflow == "pending") ?  "black" : "gray";
						searchList.push(m(viewTaskManager,{id:result.ID, color: color,
							title: result.Details, prioritycolor: prioritycolor,
							priority: priority, days: subDetails[1]}
						))
					}})
				}
			}
			page.pageSearchList = searchList;
		}).catch(function(error) {
			appAlert([{ type: 'bg-red', message: "Network Connectivity Error \n Please Check Your Network Access", }]);
		});
	},
	viewHeader : { view: function(vnode){ return (
		m("nav",{class:"w-100 white-90 z-5 cf tc relative fixed top-0 bg-red"},
			m("div", {class:"w-100 mw6 center"},[
				m("a",{class:"link",href:"/patient"},[
					m(Icons,{name:"home",class:"fl white-90 h1 dim top-0 pv3 ph2"})
				]),
				m("p", {class:"dib avenir"}, ["BILLING TASKS - ",m("span",{class:"b"},"(4)")]),
				m("a",{class:"fr link",href:"/patient/profile"},[
					m(Icons,{name:"check",class:"white-90 h1 dim fr top-0 pa3",onclick:page.saveForm}),
				]),
			]))
	)}},
	oncreate:function(){//page.searchForm()
	},
	view:function(){
	return  (
		<section class="w-100 mw6 center">

			<div id="appAlert"></div>
			{m("div",{class:"cf w-100 pv3"})}

			<div class="pa3 cf">
				<span class="dt btnPrimary mv2 center br2">
					{m("input",{class:"f6 fl bn black-80 bg-near-white pa2 w5", placeholder:"search", type:"text",
					onchange: m.withAttr("value",function(value) {page.searchText = value}) })}
					<Icons name="magnifying-glass" class="h1 w1 button-reset dim fl pa2 tc white pointer br2" onclick={page.searchForm} />
				</span>
			</div>

			<ul class="list pl0 mt0 measure center cf">
				{page.pageSearchList}
			</ul>
			{m("div",{class:"cf w-100 pv4"})}

		</section>
	)
  }
}

export default page;
