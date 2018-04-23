import m from 'mithril';
import menu from './#menu.js';
import {getCredentials, setCredentials} from './#uPort.js';

var page = { Form:{}, name,
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"red"}))
	},
	view:function(vnode){
		var credentials = getCredentials();
		console.log(credentials)
		if (credentials !== null && credentials !== undefined ){
			if (credentials.name !== null && credentials.name !== undefined ){
				page.name = credentials.name
			}
		} else {
			window.location.href = "/"
		}
		return (
			<section>
				<div id="appAlert"></div>
				<span class="fl w-100 bg-primary pv5 tc near-white" style=" ">
					<h1 class="f3 f2-l fw3 mb1 mt4 mt0-ns"><label class="fw6">{credentials.name}</label></h1>
					<h2 class="f5 f4-l fw3  mb4 lh-title">
						Please Vote for a Candidate
					</h2>
				</span>


				<article class="vh-50 dt w-100 " style=" ">
				  <div class="dtc v-mid tc black ph3 ph4-l near-white center">

					<div class="center mw7">

						<span class="fl ba b--black-20 w-25 center">
							<div class="pa2">
								<img src="https://static.pulse.ng/img/gist/origs3306194/7016366590-w644-h960/goodluck-jonathan-sad.jpg" class="db" alt="Photo of Jesse Grant" />
								<div class="pa2 bt b--black-20">
									<a class="f6 db link dark-blue hover-blue" href="#">Jonathan Ebele</a>
									<p class="f6 gray mv1">Apc</p>
									<a class="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">vote</a>
								</div>
								<a class="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
							</div>
						</span>

						<span class="fl ba b--black-20 w-25 center">
							<div class="pa2">
								<img src="https://static.pulse.ng/img/gist/origs3306194/7016366590-w644-h960/goodluck-jonathan-sad.jpg" class="db" alt="Photo of Jesse Grant" />
								<div class="pa2 bt b--black-20">
									<a class="f6 db link dark-blue hover-blue" href="#">Jonathan Ebele</a>
									<p class="f6 gray mv1">Apc</p>
									<a class="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">vote</a>
								</div>
								<a class="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
							</div>
						</span>

						<span class="fl ba b--black-20 w-25 center">
							<div class="pa2">
								<img src="https://static.pulse.ng/img/gist/origs3306194/7016366590-w644-h960/goodluck-jonathan-sad.jpg" class="db" alt="Photo of Jesse Grant" />
								<div class="pa2 bt b--black-20">
									<a class="f6 db link dark-blue hover-blue" href="#">Jonathan Ebele</a>
									<p class="f6 gray mv1">Apc</p>
									<a class="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">vote</a>
								</div>
								<a class="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
							</div>
						</span>

						</div>
					</div>
				</article>

        <footer class="pv4 ph3 ph5-m ph6-l white bg-primary">
    		  <small class="f6 db tc"> <b class="ttu">Team Valued</b> @ <b>Blockchain Lagos 2018 </b></small>
    		  <div class="tc mt3">
    		    <a href="/terms/" title="Terms" class="f6 dib ph2 link white dim">Terms of Use</a>
    		    <a href="/privacy/" title="Privacy" class="f6 dib ph2 link white dim">Privacy</a>
    		  </div>
    		</footer>
			</section>
		)
	}
}

export default page;
