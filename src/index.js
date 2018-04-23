import m from 'mithril';
import menu from './#menu.js';

import {appAlert} from './#utils.js';
import {uport, getCredentials, setCredentials} from './#uPort.js';

var page = { Form : {},
	connect:function(){
		uport.requestCredentials({
      requested: ['name', 'phone', 'avatar'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((mycred) => {
			setCredentials(mycred)
			var credentials = getCredentials();
			appAlert([{message: "Welcome " +mycred.name+"\nPlease wait.... \nwhile we log you in", }]);
			setTimeout(function(){window.location.href = "/vote"},3000)
    })
	},
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"red"}))
	},
	view:function(vnode){
		var credentials = getCredentials();
		// if (credentials.networkAddress !== null && credentials.networkAddress !== undefined ){
		if (credentials !== null && credentials !== undefined ){
			appAlert([{message: "Welcome " +credentials.Name+"\n please wait while we log you in", }]);
			setTimeout(function(){window.location.href = "/vote"},3000)
		}
		return (
			<section>
				<div id="appAlert"></div>
				<span class="fl w-100 bg-primary pv5 tc near-white" style=" ">
					<h1 class="f3 f2-l fw3 mb1 mt4 mt0-ns"><label class="fw6">bitBallot</label></h1>
					<h2 class="f5 f4-l fw3  mb4 lh-title">
						is a blockchain-based digital voting solution.
					</h2>

          <span class="bg-white bn purple shadow-4 pointer pa3 br2"
            onclick={page.connect}>Connect with uPort »
          </span>
				</span>
				<img src="../../assets/img/arrowbg.svg" class="w-100 fl ma0 pa0"/>

				<article class="vh-50 dt w-100 " style=" ">
				  <div class="dtc v-mid tc black ph3 ph4-l near-white">
            <a href="" class="dib grow no-underline near-white ph3 ">
              <img class="db" height="" src="../../../assets/img/googlestore.png"/>
              &nbsp;
            </a>

            <a href="#" class="dib grow no-underline near-white ph3 ">
              <img class="db" height="" src="../../../assets/img/applestore.png"/>
              <small>**coming Soon**</small>
            </a>
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
