import m from 'mithril';
import menu from './#menu.js';

var page = {
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"red"}))
	},
	view:function(vnode){
		return (
			<section>
				<div id="appAlert"></div>
				<article class="vh-100 dt w-100 bg-primary" style=" ">
				  <div class="dtc v-mid tc black ph3 ph4-l ">
						<h1 class="f3 f2-l fw3 mb3 mt4 mt0-ns">We are here when you need us.</h1>
						<h2 class="f5 f4-l fw3 lh-title">
							Whatever the problem is, our support team is always happy to help you.
						</h2>
						<h2 class="f5 f4-l fw3 lh-title mb5">
							 Reach out to us via email, live chat on the app or call us toll free.
						</h2>


						<section class="tc pa3 pa5-ns">
						  <article class="hide-child relative ba b--black-20 mw5 center">
						    <img src="../../assets/img/team-a.jpg" class="db" alt="" />
						    <div class="pa2 bt b--black-20">
						      <a class="f6 db link dark-blue hover-blue" href="#">Jesse Grant</a>
						      <p class="f6 gray mv1">5 mutual friends</p>
						      <a class="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">Add Friend</a>
						    </div>
						    <a class="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
						  </article>
						</section>

						<h2 class="f5 f4-l fw3 lh-title mt5">
							Give us a call, send an email or chat with us on the app,
						</h2>
						<h2 class="f5 f4-l fw3 lh-title">
							 we endeavour to answer all enquiries within a few minutes.
						</h2>
				  </div>
				</article>

			</section>
		)
	}
}

export default page;
