

<p>First name: <strong data-bind="text: firstName">todo</strong></p>
<p>Last name: <strong data-bind="text: lastName">todo</strong></p>

<p>First name: <input data-bind="value: firstName" /></p>
<p>Last name: <input data-bind="value: lastName" /></p>

<p>Full name: <strong data-bind="text: fullName"></strong></p>
<button data-bind="click: capitalizeLastName">Go caps</button>

<script type="text/javascript" src="resources/common/js/knockout.js"></script>

<script language="javascript">
	function AppViewModel() {
		this.firstName = ko.observable("Bert");
		this.lastName = ko.observable("Bertington");
		
		this.fullName = ko.computed(function() {
			return this.firstName() + " " + this.lastName();    
		}, this);
    
		this.capitalizeLastName = function() {
			var currentVal = this.lastName();        // Read the current value
			this.lastName(currentVal.toUpperCase()); // Write back a modified value
		};
	}	
	// Activates knockout.js
	ko.applyBindings(new AppViewModel());

</script>
