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
        	//form error data check
        	if(!this.userchecked){
        		alert('請勾選我已詳閱個人資料搜集、處理、利用聲明告知！');
				return
        	}
        	if (!this.captcha.state) {
    			alert("請輸入驗證碼");
				return;
        	}
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
        	//Register new user
        	$("body").loadingModal('show');
        	
        	const userinfo = {
        			custName: this.username,
        			custPhone: this.userphone,
        			custId: this.userfacebookID,
        			id: this.getUrlParameter("id"),
        			programId: this.programId,
        			type: "addPreorder_tsp" //新增一筆資料
        	};
        	
        	$.post('<p:formGuard url="/rest/ts20From/addTs20Register"/>', userinfo)
            .done(resp => {
            	if (resp.statusCode == '0000'){
                	alert('此門號已完成優惠券領取登記\n優惠券將由系統於填寫資料完成後1週內派送\n請使用所登記之門號登入台灣之星官網或APP查看領取優惠(非台灣之星用戶也可免費註冊)');
                	document.location.reload();  
            	}
            })
            .fail(resp => {
            	alert('系統忙碌中，請稍後再試');
            	document.location="https://www.tstartel.com/CWS";
            });
        	
        	$("body").loadingModal('hide');
        },
	}
})
