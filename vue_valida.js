<script type="text/javascript" src="resources/common/js/validators.min.js"></script>
<script type="text/javascript" src="resources/common/js/vuelidate.min.js"></script>

https://www.jsdelivr.com/
尋找打包js,打開後右鍵另存新檔

$.ajaxSetup({cache: false , async:false});

//預設驗證項
Vue.use(window.vuelidate.default);
const required = validators.required; //empty data checker
 //使用vuelidate中提供的validator驗證選項
const {required, email, minLength, maxLength, numeric} = window.validators
const phone = (val) => val.length==10 && /^[09]{2}[0-9]{8}$/.test(val); //cell phone checker

const vm = new Vue({
	el: '#rwd_c_092app',
	data:{
		username:"",
		userphone:"",
		userfacebookID: "",
		//captcha 要透過API驗證
		captcha: {
			inputcaptcha : "" ,
			encodedcaptcha : "",
			captchasrc : "",
			state : ""
		}
	},
	validations: {
		username: { required },
		userphone : { required , phone },
		userfacebookID : { required },
	},
	methods: {
        //submit form
        submitForm(){
        	//error data respond
        	
        	//$touch Sets the $dirty flag of the model and all its children to true recursively.
        	this.$v.$touch();
        	if (this.$v.$invalid) {
                for (let key in Object.keys(this.$v)) {
                    const input = Object.keys(this.$v)[key];
                    if (input.includes("$")) return false;
                    if (this.$v[input].$error) {
                    	switch (input) {
                    		case 'username':
                    			alert("請輸入姓名");
                    	    	break;
                    	  	case 'userphone':
                    	  		alert("請輸入手機號碼");
                    	  		break;
                    	  	case 'userfacebookID':
                    	  		alert("請輸入facebook名稱");
                    	    	break;
                    	}
                        break;
                    }
                }
                return;
            }
        	
        	$("body").loadingModal('show');
        	
        	const userinfo = {
        			name: this.username,
        			phone: this.userphone,
        			facebookID: this.userfacebookID,
        			id: this.getUrlParameter("id")
        	};
        	
        	*/
        	$("body").loadingModal('hide');
        },
	}
})
