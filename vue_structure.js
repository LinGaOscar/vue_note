<div id="app">
	<label>input last name
		<input v-model="lastName">
	</label>
	<input v-model="fistName">
	<div>
		<p>{{ lastName }}</p>
		<p>{{ fistName }}</p>
		<h1>{{ fullName }}</h1>
		<h1 v-show="!isEmpty(lastName)&!isEmpty(fistName)">{{ showFullName }}</h1>
		<h2 v-if="isEmpty(lastName)|isEmpty(fistName)"> enter fullName</h2>
		<h3 v-else>perfect</h3>
		<button @click="ckicker">click</button>
		<p>{{ counter }}</p>
	</div>
</div> 

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>

<script language="javascript">
	let app = new Vue({
		el: '#app',
		data:{
			lastName: 'Bar',
			fistName: 'Foo',
			fullName: 'Foo Bar',
			namestate: { state : "init" },
			counter: 0
		},
		watch: {
			fistName: function (val) {
				this.fullName = val + ' ' + this.lastName;
			},
			lastName: function (val) {
				this.fullName = this.fistName + ' ' + val;
			},
			'namestate.state': function() {
				
			}
		},
		computed: {
			showFullName: function() {
				return "this is your full name "+ this.fullName;
			}
		},
		methods: {
			showFullNamefunction(){
				alert(this.showFullName);
			},
			isEmpty(data){
	        	return data == null || data == undefined || data.trim().length == 0
	        },
			ckicker(){
				this.counter += 1;
				console.log(counter);
			}
		},
		created() {
			this.showFullNamefunction();
			console.log(this.isempty(""));
			alert (this.namestate.state);
		}
})
</script>

https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_label
https://codepen.io/VueMastery/pen/qxwZBQ?editors=1010
https://vuejs.org/v2/guide/list.html