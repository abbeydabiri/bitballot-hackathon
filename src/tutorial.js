import m from 'mithril';
import menu from './#menu.js';

import {uportConnect, globalState, setStatus, sendEther} from './#uPort.js'; 

var page = { Form:{sendTo:"",statusInput:"",amount:""},
 	updateState:function () {
		globalState.sendToAddr = page.Form.sendTo;
		globalState.sendToVal = page.Form.amount;
		globalState.statusInput = page.Form.statusInput;
		console.log(globalState)
	},
	oninit:function(vnode){
		m.render(document.getElementById('appMenu'), m(menu,{color:"red"}))
	},
	view:function(vnode){
		return (
			<section>
				<div id="appAlert"></div>

				<main>
		      <header><h1 id="appName">Uport Dapp Tutorial</h1></header>
		      <p>
		        Please make sure to run <code  style="color:red">npm i && npm run build-dist</code> in your command terminal before trying this example locally.
		      </p>
		      <hr/>
		      <section>
		        <h2>Connect uPort</h2>
		        <table>
		          <tbody>
		            <tr><td><span>uPort Id: </span><span>{globalState.uportId}</span></td></tr>
		            <tr><td><span>ETH Address: </span><span>{globalState.ethAddress}</span></td></tr>
		            <tr><td><span>ETH Balance: </span><span>{globalState.ethBalance}</span></td></tr>
		            <tr><td><span>Current Status: </span><span>{globalState.currentStatus}</span></td></tr>
		          </tbody>
		        </table>
		        <button class="btn btn-sm btn-primary" id="connectUportBtn" onclick={uportConnect}>Connect uPort</button>
		      </section>
		      <hr/>
		      <section>
		        <h2>Send Ether</h2>
		        <table>
		          <thead>
		            <tr>
		              <td>Send To:</td>
		              <td>Amount:</td>
		              <td></td>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td>
										{m("input",{ placeholder: "0x1234567891234567", size:"40", type:"text", value:page.Form.sendTo, class: "w-100 bn bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.sendTo = value}),
											onkeyup: function(event) { if(event.key=="Enter"){page.updateState}}
									 	})}
									</td>
		              <td>
										{m("input",{ placeholder: "5", size:"10", type:"text", value:page.Form.amount, class: "w-100 bn bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.amount = value}),
											onkeyup: function(event) { if(event.key=="Enter"){page.updateState}}
										})}
									</td>
		              <td><button class="bw0 bg-green" onclick={sendEther}>Send Ether</button></td>
		            </tr>
		            <tr>
		              <td><span>Transaction Hash(ID): </span><span>{globalState.txHashSentEth}</span></td>
		            </tr>
		          </tbody>
		        </table>
		      </section>
		      <section>
		        <h2>Set Status</h2>
		        <table>
		          <thead>
		            <tr>
		              <td>Enter current status:</td>
		              <td></td>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td>
										{m("input",{ placeholder: "Feeling good...", size:"14", type:"text", value:page.Form.statusInput, class: "w-100 bn bg-secondary br1 pa3 f6",
											oninput: m.withAttr("value",function(value) {page.Form.statusInput = value}),
											onkeyup: function(event) { if(event.key=="Enter"){page.updateState}}
										})}
									</td>
		              <td><button class="btn btn-sm btn-success" onclick={setStatus}>Set Status</button></td>
		            </tr>
		            <tr>
		              <td><span>Transaction Hash(ID): </span><span>{global.txHashSetStatus}</span></td>
		            </tr>
		          </tbody>
		        </table>
		      </section>
		    </main>

			</section>
		)
	}
}

export default page;
