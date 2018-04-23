var m = require("mithril");
import Icons from './#icons.js';
import {getCredentials, deleteCredentials} from './#uPort.js';

// export function menu() {
// 	m.render(document.getElementById('appMenu'), m(menu))
// }

export var menu = {
	color:"red", loggedIn: "",
	oninit: function() {},
	linkItem : {
		view: function(vnode) {
			return(
				<a class="link" href={vnode.attrs.href}>
					<li class="tc" onclick={menu.toggle}>
						<p class="ph2 pv3 mv0 gray hover-red dim">
							{vnode.children}
						</p>
					</li>
				</a>
			)
		}
	},
	menuItem : {
		view: function(vnode) {
			return(
				<a class="link f5" oncreate={m.route.link} href={vnode.attrs.href}>
					<li class="tc" onclick={menu.toggle}>
						<p class="ph2 pv3 mv0 gray hover-red dim">
							{vnode.children}
						</p>
					</li>
				</a>
			)
		}
	},
	toggle: function() {
		var appMenuDiv = document.getElementById("menuToggle");
		appMenuDiv.classList.toggle('dn');
		appMenuDiv.classList.toggle('animated');
		appMenuDiv.classList.toggle('bounceInDown');

		document.getElementById("nav").classList.toggle('dn');
		document.getElementById("menuBlur").classList.toggle('vh-100');
		document.getElementById("html").classList.toggle('overflow-hidden');
	},
	logout: function() {
		deleteCredentials({})
		window.location.href = "/"
	},
	view: function(vnode) {
		var credentials = getCredentials();
		if (credentials !== null && credentials !== undefined ){
			menu.loggedIn = ""
		} else {
			menu.loggedIn = "dn"
		}
		return (
			<section id="menuBlur" class="w-100 z-max ">
				<div id="menuToggle"  class=" w-100 w-30-m w-20-l mw7 center fr dn bg-white pa0" style="">
					<ul class="list pt0 pl0 w-100 ma0 overflow-scroll" style="">
						{m(menu.menuItem,{href:"/",icon:"user"},"Home")}
						{m(menu.menuItem,{href:"/team",icon:"user"},"Team")}
						<a class="link" href="#">
							<li class="tc" onclick={menu.logout}>
								<p class="ph2 pv3 mv0 gray hover-red dim">
									Logout
								</p>
							</li>
						</a>
						<li class="tc" onclick={menu.toggle}>
							<p class="ph2 pv3 mv0 near-white bg-primary">
								CLOSE
							</p>
						</li>
					</ul>
				</div>

				<nav id="nav" class={"w-100 bg-white black z-5 ph2  "+vnode.attrs.color} style="height:53px" >
					<div class="w-100 mw7 center">

						<div class="fl f5 ma3 tracked fw5 black">
							bitBallot | <span class="b">Demo</span>
						</div>

						<Icons name="menu" class="fr mr4 mv3 h1 dim dib dn-ns " onclick={menu.toggle}/>
						<nav class="fr mr4 mv3 dn dib-ns">

						  <a class="link dim gray f5 dib mr4" href="/team"><small>About Us</small></a>
							<a class={"mh2 link dim white f6 "+menu.loggedIn} href="#" onclick={menu.logout}>
								<small class="pa2 ph3 bg-dark-red br2">LOGOUT</small>
							</a>
						</nav>
					</div>
				</nav>
			</section>
		)
	}
}

export default menu;
