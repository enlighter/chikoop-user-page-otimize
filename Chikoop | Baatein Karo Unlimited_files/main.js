'use strict'
var register = {mobile:0,chickpass:'',interest_list:[],prevdata:'',mobno:0,call:true,datacardno:0,operatorcheck:true,status:false}
jQuery(document).ready(function($) {	
	
/*	$('.btnStyleOrange').on('click', function (e) {
		FBLogin();
	});*/
	
	$( "#inputimg" ).change(function(e) {
		$( "#uploadForm" ).submit();

	});	
	

		

$.validator.addMethod(
	        "regex",
	        function(value, element, regexp) {
	            var re = new RegExp(regexp);
	            return this.optional(element) || re.test(value);
	        },
	        "Please check your input."
	);
  $("#username_avail").keyup(function() {
	 
	 var username_avail = $("#username_avail").val();
	// alert(username_avail);
	
	var send_data = "username_avail=" + username_avail;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/username_avail', send_data, function(data) {
			if(data.check == 'success'){
				//alert("sucess");
				$("#availablity").css("background-color", "#0C0").css("border-color", "#0C0").val("Available");
			}
			if(data.check == 'unsuccess'){
				//alert("try again");
				$("#availablity").css("background-color", "#f00").css("border-color", "#f00").val("Not available");
			}
		});
	
     });

  $("#otp_resend").click(function() {
	 
	 var mymobile = $("#mymobile").val();
	 //alert(mymobile);
	
	var send_data = "mymobile=" + mymobile;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/regotp', send_data, function(data) {
			if(data.message == 'success'){
				
			}
		});
	
     });
	 
	 $("#verify_reg_otp").click(function() {
	 
	 var reg_otp_code = $("#reg_otp_code").val();
	 //alert(reg_otp_code);
	
	var send_data = "reg_otp_code=" + reg_otp_code;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/verify_regotp', send_data, function(data) {
			if(data.check == 'success'){
				//alert("Verified");
				$("#verify_reg_otp").val("Verified");
			}
			if(data.check == 'unsuccess'){
				alert("Wrong OTP! Try again or send new OTP");
			}
		});
	
     });
	 
	   $("#sendrefcode").click(function() {
	 
	 var emaill = $("#emaill").val();
	 alert(emaill);
	
	var send_data = "emaill=" + emaill;
	alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/sendrefcode', send_data, function(data) {
			if(data.message == 'success'){
				
			}
		});
	
     });
	 
$(".box").click(function() {

if ( $( this ).hasClass( "thisischecked" ) )
{
	$(this).removeClass('thisischecked');
	$(this).siblings('input[type="checkbox"]').prop('checked', false);
}
else
{
	$(this).addClass('thisischecked');
	$(this).siblings('input[type="checkbox"]').prop('checked', true);
}


});

	 
$(".box2").click(function() {

if ( $( this ).hasClass( "thisischecked" ) )
{
	$(this).removeClass('thisischecked');
	$(this).siblings('input[type="checkbox"]').prop('checked', false);
}
else
{
	$(this).addClass('thisischecked');
	$(this).siblings('input[type="checkbox"]').prop('checked', true);
}

});

$("#registration1").validate({
		onkeyup: false,
		rules: {
			mobile: {
				required: true,
				regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})",
				//valid_mobile: true,
			    remote: {
		          url: APP_URL+'/ajax/availability',
		          type: "post",
		          data: {
		        	  mobile: function() {
		              return $("[name='mobile']").val();
		            }
		          }
		        }

			},
			username_avail:{
				required: true,
				minlength: 5
			},
			interest: {
               required: true,
               minlength: 2  // at least two checkboxes are required
               // maxlength: 4 // less than 5 checkboxes are required
               // rangelength: [2,4] // must select 2, 3, or 4 checkboxes
            },
			dob:{
				required: true
			},
			email: {
				required: true,
				email: true,
				remote: {
		          url: APP_URL+'/ajax/availability',
		          type: "post",
		          data: {
		        	  mobile: function() {
		              return $("[name='email']").val();
		            }
		          }
		        }
			},
			password: {
				required: true,
				minlength: 8
			},
			con_password: {
				required: true,
				confirm_pasword_check: true,
				minlength: 8
			},
			check:{
				required: true
			}
			
		},
		submitHandler: function(form) {
			//console.log($("#regEmail").val());
			/*var send_data = $("form").serialize();
		//alert(send_data);
			$.getJSON(APP_URL+'/ajax/register', send_data, function(data) {
				if(data.check == 'success'){
					$(location).attr("href",APP_URL+"/user");
				}
			});*/
			
			var send_data = new FormData($('#registration1')[0]);
			
			$.ajax({
                type: 'POST',
                url: APP_URL+'/ajax/register',
                data:send_data,
                cache:false,
                contentType: false,
                processData: false,
                success: function(data) {
                   $(location).attr("href",APP_URL+"/user");
                }
                });
						
		},
		messages: {
			username_avail:
				{	
				required:"Please enter username",
				minlength: "Your username must be at least 5 characters long"
				},
			dob: "Please enter date of birth",
			lname: "Please enter last name",
			mobile:{ 
				required:"Please enter prepaid mobile number",
				remote:"Mobile number is already registered."
			},			
			password:
				{	
				required:"Please enter password",
				minlength: "Your password must be at least 8 characters long"
				},
			con_password: {	
				required:"Please re-enter password",
				minlength: "Your password must be at least 8 characters long"
				},				
			email: {
				required:"Please enter email id",
				remote:"Email id is already registered."
			},
			check:"Please Accept Terms And Conditions"
        },
		errorPlacement: function(error, element) {
					
				  if(element.attr("name")=='dob'){
				   error.insertAfter($("#date"));
				  }else if(element.attr("name")=='username_avail'){
					  error.insertAfter($("#availablity"));  
				  }else if(element.attr("name")=='mobile'){
					  error.insertAfter($("#mymobile"));  
				  }else if(element.attr("name")=='email'){
					  error.insertAfter($("#emaill"));  
				  }else if(element.attr("name")=='con_password'){
					  error.insertAfter($("#con_password"));  
				  }else if(element.attr("name")=='password'){
					  error.insertAfter($("#password"));  
				  }else if(element.attr("name")=='check'){
					  error.insertAfter($(".labels1"));
				  }
				  error.css('font-size', '12px');
				  error.css('position', 'relative');
				  error.css('bottom', '-15px');
	    	}		
	});

$("#mobile_verify").validate({
	onkeyup: false,
	rules: {
		vcode: {
			required: true,
			secret_code_check:true
		}
	},
	submitHandler: function(form) {
		//var vcode=$("[name='vcode']").val();
		//console.log(register.mobile);
		//$('#mobile_verify').hide();
		//$('#password_verify').show();
		$('#verification_steps li:nth-child(1)').removeClass("active");
		$('#verification_steps li:nth-child(2)').addClass("active");
		
		$('html, body').animate({
	        scrollTop: $("#password_verify").offset().top
	    }, 'fast');
		
/*		$('html, body').animate({
	        scrollTop: $("#password_verify").offset().top
	    }, 2000);*/
	//console.log($("[name='fname']").val());
/*		$.getJSON(APP_URL+'/ajax/register', send_data, function(data) {
			if(data.check == 'success'){
				register.mobile=mobNo;
				$('#myTab a:nth-child(1)').tab('show');
			}
		});*/
		
		
	},
	errorPlacement: function(error, element) {

			   return false;

    	}		
});

$("#password_verify").validate({
	onkeyup: false,
	rules: {
		newpassword: {
			required: true
		},
		conpassword: {
			required: true,
			confirm_pasword_check: true
		}
	},
	submitHandler: function(form) {
		
		
		register.chickpass=$("[name='newpassword']").val();
		$('#pass_section').hide();
		$('#fb_login_txt').show();
		FBLogin('register');
		//var vcode=$("[name='vcode']").val();
		
/*		$('#password_verify').hide();
		$('#request_permission').show();
		$('#verification_steps li:nth-child(2)').removeClass("active");
		$('#verification_steps li:nth-child(3)').addClass("active");*/
	
	//console.log($("[name='fname']").val());
/*		$.getJSON(APP_URL+'/ajax/register', send_data, function(data) {
			if(data.check == 'success'){
				register.mobile=mobNo;
				$('#myTab a:nth-child(1)').tab('show');
			}
		});*/
		
		
	},
	errorPlacement: function(error, element) {
			   return false;
    	}		
});



var validate =$("#request_permission").validate({
	onkeyup: false,
	rules: {

	},
	submitHandler: function(form) {
		//var vcode=$("[name='vcode']").val();
		//console.log(register.mobile);
		//FBLogin();
		
		//$('#mobile_verify').hide();
		//$('#password_verify').show();
	//console.log($("[name='fname']").val());
/*		$.getJSON(APP_URL+'/ajax/register', send_data, function(data) {
			if(data.check == 'success'){
				register.mobile=mobNo;
				$('#myTab a:nth-child(1)').tab('show');
			}
		});*/
		
		
	},
	errorPlacement: function(error, element) {
			   return false;
    	}		
});

$("#uploadForm").on('submit',(function(e) {
	$('#imgerr').html('<div style="text-align: center; padding: 10px 60px;"><img src="'+APP_URL+'/resource/images/loader.gif" alt=""></div>');
	e.preventDefault();
	$.ajax({
    	url: APP_URL+'/ajax/imageUpload',
		type: "POST",
		data:  new FormData(this),
		contentType: false,
	    cache: false,
	    dataType: "json",
		processData:false,
		success: function(data)
	    {
		
		if(data.type=='imgchange'){
			
			$(".userImg").html('<img src="'+data.imgurl+'" style="width: 32px;border:1px solid #fff;padding:1px;" />');
			$("#targetLayer").html('<img src="'+data.imgurl+'" width="239px" height="239px" class="img-thumbnail" />');
		}else if(data.type=='largesize'){
			$('#imgerr').html('Image size exceeded 1 MB.');
		}else if(data.type=='register'){
			$('#imgerr').html('');	
			$("#targetLayer").html('<img src="'+data.imgurl+'" width="239px" height="239px" class="img-thumbnail" />');
		}
		},
	  	error: function() 
    	{
    	} 	        
   });
}));

$('.cancel').on('click', function (e) {
    e.preventDefault();
    validate.resetForm();
    $('form').get(0).reset();
});

$("#nextstep").on('click', function (e) {
	$('#uploadForm,#nextstep').hide();
	$('#interests,#fiend_friends_step').show();
	
	$('#personality_steps li:nth-child(1)').removeClass("active");
	$('#personality_steps li:nth-child(2)').addClass("active");
});

$('#interest_list input').click(updateTextArea);

//updateTextArea();
$('#skip').on('click', function (e) {
	$('#interests').show();
	$('#thismyprofile').hide();
});
$('#fiend_friends_step').on('click', function (e) {
	
	$('#interests').hide();
	$('#thismyprofile').show();
	
	var send_data = "interest_list=" + JSON.stringify(register.interest_list);
	
		$.getJSON(APP_URL+'/ajax/interestList', send_data, function(data) {
			if(data.message == 'success'){
				
				$('#personility').hide();
				$('#findfriends').show();
				
				$('#myTab li:nth-child(3)').removeClass("active");
				$('#myTab li:nth-child(4)').addClass("active");
				
				$('html, body').animate({
			        scrollTop: $("#findfriends").offset().top
			    }, 'fast');

			}
		});
	
});
//auth_code='';
if(auth_code){
	//window.location.replace(APP_URL+'/register');
	//window.location= APP_URL+'/register';
	var send_data = "authcode=" + auth_code;
	$.getJSON(APP_URL+'/ajax/gmailContacts', send_data, function(data) {
			//console.log(data.length);
			if(data.length){
				
				$('a.gmailbutton').on("click", function (e) {
			        e.preventDefault();
			    });
			}
			$('#home').hide();
			$('#findfriends').show();
			$('#myTab li:nth-child(1)').removeClass("active");
			$('#myTab li:nth-child(4)').addClass("active");
	});
	
}

if(google_plus){
	
	var send_data = "authcode=" + google_plus;
	$.getJSON(APP_URL+'/ajax/googlePlus', send_data, function(data) {
			//console.log(data);
			
			$('#home,#email_contact').hide();
			$('#findfriends,#socialmediainfo').show();
			$('#myTab li:nth-child(1)').removeClass("active");
			$('#findfriend_steps li:nth-child(2)').addClass("active");
	});
	
}

if(log_type){
	
	$('#home,#email_contact').hide();
	$('#findfriends,#socialmediainfo').show();
	$('#myTab li:nth-child(1)').removeClass("active");
	$('#myTab li:nth-child(4)').addClass("active");
	
	$('#findfriend_steps li:nth-child(1)').removeClass("active");
	$('#findfriend_steps li:nth-child(2)').addClass("active");
}

$('#socialmediatab').on('click', function (e) {
	$('#email_contact').hide();
	$('#socialmediainfo').show();
	
	$('#findfriend_steps li:nth-child(1)').removeClass("active");
	$('#findfriend_steps li:nth-child(2)').addClass("active");
	
});

jQuery.validator.addMethod('secret_code_check', function (value, element, param) {
	var nocheck=false;
	if(value == register.mobile){
		nocheck=true;
	}
    return nocheck;
}, 'Please enter secret code');

jQuery.validator.addMethod('confirm_pasword_check', function (value, element, param) {
	var passcheck=false;
	if($("[name='password']").val() == $("[name='con_password']").val()){
		passcheck=true;
	}
    return passcheck;
}, 'passwords not match');


$("#signInForm").validate({
	onkeyup: false,
	rules: {
		loginFormUserMobile: {
			required: true,
			regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
		},
		loginFormUserPass: {
			required: true,
			regex: "^[a-zA-Z0-9'.\\s]{1,40}$",
			minlength: 3

		}
	},
	messages: {
		
			loginFormUserMobile:{ 
				required:"Please enter your mobile number",
				
			},			
			loginFormUserPass: "Please enter your password",				
			
        },
	errorPlacement: function(error, element) {
			  if(element.attr("name")=='loginFormUserMobile'){
				   error.insertAfter($("#loginFormUserMobile"));
				  }else if(element.attr("name")=='loginFormUserPass'){
					  error.insertAfter($("#loginFormUserPass"));  
				  }
				    error.css('font-size', '12px');
				  error.css('position', 'relative');
				  error.css('bottom', '-15px');
    	}		
});

$("#createnewsignIn").validate({
	onkeyup: false,
	rules: {
		ref_code: {
			required: true,
			//regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
		},
		reg_phn: {
			required: true,
			regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
			

		}
	},
	messages: {
		
			ref_code:{ 
				required:"Please enter your code",
				
			},			
			reg_phn: "Please enter your mobile number",				
			
        },
	errorPlacement: function(error, element) {
			  if(element.attr("name")=='ref_code'){
				   error.insertAfter($("#ref_code"));
				  }else if(element.attr("name")=='reg_phn'){
					  error.insertAfter($("#reg_phn"));  
				  }
				    error.css('font-size', '12px');
				  error.css('position', 'relative');
				  error.css('bottom', '-15px');
    	}		
});

$( "#profileedit" ).validate({
	onkeyup: false,
	rules: {
		email: {
			required: true,
			email: true
		},
		firstname: {
			required: true,
		},
		lastname: {
			required: true,
		},
		status: {
			required: true,
		},
		occupation: {
			required: true,
		},
		income: {
			required: true,
		},
		state: {
			required: true,
		},
		city: {
			required: true,
		},
		pin: {
			required: true,
		}
	},
	messages: {
		email: {   
            remote: "This email is already registered!"
		}
	},
	submitHandler: function(form) {	
		var send_data = "userid=" + $("[name='userid']").val()  + "&useremail=" + $( "#email" ).val() 
				+ "&firstname=" + $( "#firstname" ).val()+ "&lastname=" + $( "#lastname" ).val()+ "&status=" + $( "#status" ).val()
				+"&occupation=" + $( "#occupation" ).val()+"&income=" + $( "#income" ).val()+"&state=" + $( "#state" ).val()+"&city=" + $( "[name='city']" ).val()+"&pin=" + $( "[name='pin']" ).val();
		if(register.prevdata!=send_data){
	        $.getJSON(APP_URL+'/ajax/profileUpdate', send_data, function(data) {
				if (data.check == "success") {
					if($("[name='userid']").val()){	
						$(location).attr("href",APP_URL+"/user");
					}else{
						$(location).attr("href",APP_URL+"/user");
						}
					return true;
				} else {
					register.prevdata=send_data;
					if (data.message == "Wrong email") {
						displayError('emailtext',data.message);						
										
					} else if(data.message == "email") {
						displayError('emailtext','This email address is not available.');
					} 
					return false;
				}
				function displayError(divid,errmsg){
					//$("#emailtext,#usernametext").empty();
					if(divid=='errortext')
					{
						$("#"+divid).css({"color" : "red","margin-left":"-12px"}).append(errmsg);
						//$("#signupbuttoncont").css({'margin-top':'10px','margin-bottom':'6px'});
						
					}
					else
					{
						$("#"+divid).css({"color" : "red"}).append(errmsg);
						//$("#signupbuttoncont").css({'margin-bottom':'6px'});
					}
					
				}			
	       });
		}
        return false;
	},
	errorPlacement: function(error, element) {

			return false;

		}			
});

	//$("[name='mobileNo']").blur(function(){
	//$("[name='mobileNo']").keyup(function(){
	////////////////////////////////////////////
	$("[name='mobileNo']").blur(function(){
		var mobile_number = $("[name='mobileNo']").val();
		//alert(mobile_number);
		var send_data = "mobile=" + mobile_number;
	
	
		$.getJSON(APP_URL+'/ajax/mobNoInfo', send_data, function(data) {
			if(data.check == 'mnp'){
				$("#operator").val(data.mnpoperator);
				$("#circle").val(data.mnpcircle);
				recharheOptions(data.mnpoperator,data.mnpcircle);
			}
			else{
				$("#operator").val(data.Operator);
				$("#circle").val(data["Telecom circle"]);
				recharheOptions(data.Operator,data["Telecom circle"]);
			}
		});
		
	
	});
	
	$("#operator").on("blur", function(){
	
	var mob_op = $("#operator").val();
	var mob_cir =$("#circle").val();
	recharheOptions(mob_op,mob_cir);
	
	});
	$("#circle").on("blur", function(){
	
	var mob_op = $("#operator").val();
	var mob_cir =$("#circle").val();
	recharheOptions(mob_op,mob_cir);
	
	});
	
	
	
	///////////////////////////////////////////
	
	$("#rechargeform").validate({
		onblur: true,
		ignore: "",
		rules: {
			mobileNo: {
				required: true,
				regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
			},
			user: {
				required: true
			},
			selection: {
				required: true
			},
			inputammount: {
				required: true
				//check_operator_service: true
			}
		},
		messages: {
			mobileNo: "Please enter prepaid mobile number",
			user: "Please select operator",
			selection: "Please select circle",
			inputammount: "Please enter Recharge amount"
        },
		errorPlacement: function(error, element) {
				  if(element.attr("name")=='user'){
				   error.insertAfter($("#operator"));
				  }else if(element.attr("name")=='mobileNo'){
					  error.insertAfter($("#mobileNo"));  
				  }else if(element.attr("name")=='selection'){
					  error.insertAfter($("#circle"));  
				  }else if(element.attr("name")=='inputammount'){
					  error.insertAfter($("#mob_amount"));  
				  }
	    	}		
	});
	
	$("#dthform").validate({
		onblur: true,
		ignore: "",
		rules: {
			dthno: {
				required: true
				//regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
			},
			user: {
				required: true
			},
			inputammount: {
				required: true
				//check_operator_service: true
			}
		},
		messages: {
			dthno: "Please enter your customer ID",
			user: "Please select operator",
			inputammount: "Please enter recharge amount"
        },
		errorPlacement: function(error, element) {
				  if(element.attr("name")=='dthno'){
				   error.insertAfter($("#dthno"));
				  }else if(element.attr("name")=='user'){
					  error.insertAfter($("#dthoperator"));  
				  }else if(element.attr("name")=='inputammount'){
					  error.insertAfter($("#dth_amount"));  
				  }
	    	}		
	});
	
	$("#datacardform").validate({
		onblur: true,
		ignore: "",
		rules: {
			datacardNo: {
				required: true,
				regex: "([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})"
			},
			user: {
				required: true
			},
			selection: {
				required: true
			},
			inputammount: {
				required: true
				//check_operator_service: true
			}
		},
		messages: {
			datacardNo: "Please enter prepaid data card number",
			user: "Please select operator",
			selection: "Please select circle",
			inputammount: "Please enter Recharge amount"
        },
		errorPlacement: function(error, element) {
				  if(element.attr("name")=='user'){
				   error.insertAfter($("#dataoperator"));
				  }else if(element.attr("name")=='datacardNo'){
					  error.insertAfter($("#datacardno"));  
				  }else if(element.attr("name")=='selection'){
					  error.insertAfter($("#datacircle"));  
				  }else if(element.attr("name")=='inputammount'){
					  error.insertAfter($("#data_amount"));  
				  }
	    	}		
	});
	
	
	
	$( "#dthoperator" ).change(function(e) {
		
		$.getJSON( APP_URL+"/ajax/dthPlans", { operator: this.value} )
		  .done(function( data ) {
			  
			  dthRechargePlans(data);
		  })
		  .fail(function( jqxhr, textStatus, error ) {
		    
		    //console.log( error);
		});
		

	});
	
	$("#dthRechargeOption").click(function(){
		$(".video_sec,.rechargeOption-table").hide();
		$("#dth-plans").show();
	});
	
	$("#dthCrossBtn").click(function(){
		$("#dth-plans").hide();
		$(".video_sec").show();
	});
	$("#mobRechargeOption").click(function(){
		$(".video_sec,.rechargeOption-table").hide();
		$("#mob-plans").show();
	});
	
	$("#mobCrossBtn").click(function(){
		$("#mob-plans").hide();
		$(".video_sec").show();
	});
	
	//$("[name='datacardNo']").blur(function(){	
	$("[name='datacardNo']").on('input propertychange paste', function() {
		var datacardno=$("[name='datacardNo']").val();
		if(isNaN(datacardno)){
			datacardno = datacardno.replace(/\D/g,"");
			$("[name='datacardNo']").val(datacardno);
		}else{
		if((datacardno.length == 10)&& (register.datacardno !=datacardno)&&(register.call)){
			register.call=false;
			$('#recharge_loding').html('<div style="text-align: center;position:absolute;z-index:100; padding: 102px 200px;"><img src="'+APP_URL+'/resource/images/loding_img.gif" alt=""></div>');
			var send_data = "mobile=" + datacardno;
			$.getJSON(APP_URL+'/ajax/mobNoInfo', send_data, function(data) {
				$('#recharge_loding').html('');
				if(data.Operator){
					//console.log(data.body['Operator']);
					register.datacardno=datacardno;
					//$("#operator option:first").text(data.body.Operator);
					
					var imgname=data.Operator.replace(/\s/g,'_');
					var opp_str = data.Operator.toLowerCase().replace(/\b[a-z]/g, function(letter) {
					    return letter.toUpperCase();
					});
					
					
					$("[name='user']").val(data.Operator);
					$('#dataoperator > .text').html('<img class="ui mini avatar image" src="'+APP_URL+'/resource/images/'+imgname.toLowerCase()+'_icon.png">'+opp_str);
					$("[name='selection']").val(data['Telecom circle']);
					$('#datacircle > .text').html(data['Telecom circle']);
					
					//$('#dataoperator', 'select[name="dataoperator"]').removeAttr('selected');
					
					//$('#circle', 'select[name="circle"]').removeAttr('selected');
/*					$("#dataoperator option[value='"+data.Operator+"']").attr("selected","selected");
					$("#datacircle option[value='"+data['Telecom circle']+"']").attr("selected","selected");*/
					datacardRecharheOptions(data.Operator,data['Telecom circle']);
				}
			});
						
			}
		}
	});
	
	$("#datacardRechargeOption").click(function(){
		$(".video_sec,.rechargeOption-table").hide();
		$("#datacard-plans").show();
	});
	
	$("#datacardCrossBtn").click(function(){
		$("#datacard-plans").hide();
		$(".video_sec").show();
	});
	
	jQuery.validator.addMethod('check_operator_service', function (value, element, param) {
		
	if(register.operatorcheck){
			register.operatorcheck=false;
		var mobno=$("[name='mobileNo']").val();
		var send_data = "mobile=" + $("[name='mobileNo']").val()+"&operator="+$("#operator").val()+"&circle="+$("#circle").val();
		$.getJSON(APP_URL+'/ajax/operatorService', send_data, function(data) {
			register.operatorcheck=true;
			if(data.check=='success'){
				register.status = true;
				
			}
			
		});
		}
	
	return register.status;
	}, 'Service of operator failed');
	
	
	$("#chikoop_fb_login,#chikoop_fb_login_popup").click(function(){
		FBLogin('login');
	});
	
	$("#recharge_now").click(function(){
		$('#login-modal').modal('toggle');
		var send_data = {"mobile" : $("[name='mobileNo']").val(),"operator":$("#operator").val(),"circle":$("#circle").val(),"mob_amount":$("#mob_amount").val(),"rtype":$("#rtype").val()};
		$.getJSON(APP_URL+'/ajax/mobileRechargeInfo', send_data, function(data) {
			
			if(data.check=='success'){
				
				
			}
			
		});
	});
	
	$("#lostpasswd").click(function(){
		
		$('#login-modal').modal('toggle');
		$('#forgotpasswd').modal('toggle');
	});
	
	$("#forgot_passwd").validate({
		onkeyup: false,
		rules: {
			email: {
				required: true,
				email: true,
				//valid_mobile: true,
			    remote: {
		          url: APP_URL+'/ajax/verifyMail',
		          type: "post",
		          data: {
		        	  mobile: function() {
		              return $("[name='email']").val();
		            }
		          }
		        }

			}
		},
		submitHandler: function(form) {

			var send_data = "email=" + $("[name='email']").val();

			$.getJSON(APP_URL+'/ajax/forgotpass', send_data, function(data) {
				
				if(data.check == 'success'){
					$('#forgotpasswd').modal('toggle');
					$('#chikoop_msg').modal('toggle');
					$(".modal-title").html('Check Your Email');
					$(".modal-body p").html('Check your email - we sent you an email with a link to reset your password');
					//$(location).attr("href",APP_URL+"/user/profile");
				}
			});
						
		},
		messages: {
			email:{ 
				required:"Please enter email id",
				email:"Please enter valid email id",
				remote:"THIS EMAIL ID IS NOT REGISTERED ON CHIKOOP"
			}			

        },
		errorPlacement: function(error, element) {
					
				  if(element.attr("name")=='email'){
				   error.insertAfter($("#user_email"));
				  }
				  error.css('font-size', '12px');
				  error.css('position', 'absolute');
				  
	    	}		
	});
	
/*	jQuery.validator.setDefaults({
		  debug: true,
		  success: "valid"
		});*/
		$( "#forgot_psswd" ).validate({
		  rules: {
		    password: "required",
		    conpassword: {
		      equalTo: "#password"
		    }
		  },
		  submitHandler: function(form) {

			  var send_data = "userpassword=" + $("[name='password']").val() + "&useremail=" + $("#useremail").val() + "&pass_change_code=" + $("#pass_c_c").val();

				$.getJSON(APP_URL+'/ajax/resetpassword', send_data, function(data) {
					if(data.message=="success"){
					$(location).attr("href",APP_URL+"/user");
					}

				});
							
			},
			messages: {
				password:"Please enter new password",
				conpassword:"Enter Confirm Password Same as Password"
	        },
			errorPlacement: function(error, element) {
						
					  if(element.attr("name")=='password'){
					   error.insertAfter($("#newpass"));
					  }else if(element.attr("name")=='conpassword'){
					   error.insertAfter($("#conpass"));
					  }
					  error.css('font-size', '12px');
					  error.css('position', 'absolute');
					  error.css('bottom', '-15px');
					  
		    	}		
		  
		});
		
		
		$("#new_pswd").validate({
			onkeyup: false,
			rules: {
				oldpassword: {
					required: true,
				    remote: {
			          url: APP_URL+'/ajax/verifyPassword',
			          type: "post",
			          data: {
			        	  mobile: function() {
			              return $("[name='oldpassword']").val();
			            }
			          }
			        }

				},
				newpassword: {
					required: true,
				},
				conpassword: {
				      equalTo: "#newpassword"
				    }
			},
			submitHandler: function(form) {

				var send_data = "userpassword=" + $("[name='newpassword']").val() + "&oldpassword=" + $("#oldpassword").val();

				$.getJSON(APP_URL+'/ajax/resetpassword', send_data, function(data) {

					if(data.message == 'success'){
						$('#chikoop_msg').modal('toggle');
						$(".modal-title").html('Reset Your Password');
						$(".modal-body p").html('Password reset successfully');
						$(location).attr("href",APP_URL+"/user/profile");
					}
				});
							
			},
			messages: {
				oldpassword:{ 
					required:"Please enter your old password",
					remote:"Please enter valid old password"
				},
				newpassword: "Please enter new password",
				conpassword:"Enter Confirm Password Same as Password"

	        },
			errorPlacement: function(error, element) {
				
					  if(element.attr("name")=='oldpassword'){
						  
					   error.insertAfter($("#oldpasstext"));
					   
					  }else if(element.attr("name")=='newpassword'){
						  
					   error.insertAfter($("#passtext"));
					   
					  }else if(element.attr("name")=='conpassword'){
						  
					   error.insertAfter($("#conpasstext"));
					   
					  }
					  
					  error.css('font-size', '12px');
					  error.css('position', 'absolute');
					  error.css('bottom', '-15px');
					  
		    	}		
		});
		
		var list = [];
	    $(".coupon_list").click(function(e){
	    	e.stopPropagation();
            //$(this).parent().toggleClass("red");
            //var elementValue = $(this).val();
	    	var elementValue = this.id.split("_");
            var elementIndex = $.inArray(elementValue[1], list) ;
            if($.inArray(elementValue[1], list) === -1 ){
                list.push(elementValue[1]);
                //$("#"+this.id).addClass("coupon_sado");
                //$("#"+this.id).html('<img src="'+APP_URL+'/resource/images/success_tick.png" alt="">');
                $(this).find('.select_pick').addClass("coupon_sado");
		$(this).find('.select_pick').html('<img src="'+APP_URL+'/resource/images/success_tick.png" alt="">');
                $("#coupon_no").html(list.length);
                //console.log("add");//works
            } else{
                list = $.grep(list, function (value) {
                    return value != elementValue[1];
                });
                //$("#"+this.id).removeClass("coupon_sado");
                //$("#"+this.id).html('Pick for Rs. 0');
                 $(this).find('.select_pick').removeClass("coupon_sado");
               $(this).find('.select_pick').html('Pick for Rs. 0');
                $("#coupon_no").html(list.length);
                 //console.log("remove");//works..
            }
            var addr=$("[name='addr']").val();
            	addr=addr.split("|");
            addr[4]=list.join(',');
            var addr_str=addr.join('|');
            $("[name='addr']").val(addr_str);
            //console.log(list.join(','));//always getting the value
        })
        

        
        $(".coupon_list").click(function(e){
        	//e.stopPropagation();
        	
        	var str_arr=this.id.split('_');
        	var send_data = "cid=" + str_arr[1];
        	$.getJSON(APP_URL+'/ajax/selectCoupons', send_data, function(data) {
            	//$('#coupon-modal').modal('toggle');
            	$("#myModalLabel").html(data.brand);
            	$(".modal-body-left").html('<img class="img-responsive" src="'+APP_URL+'/resource/images/coupons/'+data.cimg+'" alt="">');
            	var desc='<div class="modal-social-icons"><h1>'+data.coffer+'</h1><span>'+data.cdesc+'</span><h1>Available in</h1><span>'+data.valid_cities+'</span>'
		            	+'<h1>Save</h1><span><i class="fa fa-inr"></i>'+data.save_value+'</span>'
		            	+'<h1>Expires on</h1><span>'+data.exp_date+'</span>'
		            	+'<h1>Terms & Conditions</h1><span>'+data.terms_conditions+'</span></div>';
            	
            	$(".modal-body-right").html(desc);
        		
        	});
        	
        });
		
		
		
/*		var some = [];
		$(".coupon_list > .pickfor").click(function(){
			
			
			some.push(this.id);
			console.log(some);
			$(".coupon_list").addClass("intro");
		});*/
		
/*		$(".coupon_list").click(function(){
			
			console.log(this.id);
			//$(".intro").removeClass("intro");
		});*/
	
	    
        $(".btnStyleOrange a").click(function(e){
        	var msg_arr = [];
        	msg_arr['know_more_1']={'msg':'Chikoop is a unique service which allows you to use your android based mobile app to call your loved ones for free without using Internet, you just need to install CHIKOOP mobile app and register with us, after that on Chikoop app home screen just click on the contact you want to get connected with and get connected. For example refer to image of Chikoop app, you need to click icon of Kim if you want to talk to Kim.'};
        	msg_arr['know_more_2']={'msg':'Chikoop is a unique service which also allows non android and non-smart phone users to Chikoop. User just need to register on Chikoop from website for first time, after that you can start using Chikoop, everytime you want to call someone for free without Internet just give miscall to 1800 4200 786.'};
        	msg_arr['know_more_3']={'msg':'Chikoop severs will call you back once we received missed call from our registered users. Pick up the phone and enter your friend\'s number whom you want to call followed by #'};
        	msg_arr['know_more_4']={'msg':'Once you receive call from our server, you need to pick up the call and enter your Friends Number followed by #, to whom you want to get connected with. We also don\'t want our valuable user to waste time by hearing boring "tring tring" so in that portion of Chikoop call you will hear some exciting and relevant offers from your favorite brands.'};
        	
        	msg_arr['what_is_chikoop']={'msg':'<h2 class="what_is">What is Chikoop</h2>' 
        		+'<p>Chikoop is a unique initiative by <a href="#" target="_blank">Positron Internet</a> in lines with Indian Government\'s <a href="https://en.wikipedia.org/wiki/Digital_India" target="_blank">Digital India Campaign</a> where we are trying to connect each Indian mobile user with telephony services at zero cost. We are trying to develop a system that connects Chikoop user to a whole world without Internet.</p>'
        		+'<p>Imagine it as we are trying to give Chikoop user ability to use same services as by Skype, Facebook, Whatsapp, twitter, Google and Instagram on Chikoop Cloud platform without Internet.</p>'};
        	
        	
        	msg_arr['chikoop_for']={'msg':'<h2 class="what_is">What Chikoop is for India?</h2>' 
        		+'<p>Basically Chikoop is an attempt to connect each one in India and let everyone to use services that are provided on Internet on monthly bills that most of Indian Population cannot bear.</p>'
        		+'<p>Currently mobile in India has penetration to those places where even basic services like electricity and roads are struggling, we want to open world of opportunities for everyone through this mobile phone, we want our users to use their phone to get connected and get access to much more facilities and technological innovations.</p>'
        		+'<p>Chikoop is initiative by Positron Internet which is a social entrepreneurship venture from students and alumni of Various IITs and IIMs of India mainly from Indian Institute of Management Calcutta.</p>'};
        	//e.stopPropagation();
        	$('#popup-knowmore').modal('toggle');
        	//$("#modal-title").html('Watch your Favourite videos & get Free Recharge');
        	$("#msg1").html(msg_arr[this.id].msg);
        	
        	//console.log(this.id);
        	
        });
        
        
        // use for tooltip
       // $('[data-toggle="tooltip"]').tooltip(); 
        
        
        $("#depositcash").click(function(e){
        	
        	//e.stopPropagation();
        	var amount = $("#depositamout").val();
        	var send_data = "amount=" + amount;
        	
        	$.getJSON(APP_URL+'/ajax/depositcash', send_data, function(data) {
        	alert(send_data);
        	
        		var url=data.payment_url;
        		var stat=data.status;
        		alert(url);
        		alert(stat);
        		
        		url = url.replace(/\\/g, '');
        		
        		console.log(url);
        		$('#addwallet').attr('action', url).submit();
        		//$('#addwallet').submit();
        	});
        	
        });
        
        $("#resendpin").click(function(e){
        	
        	//e.stopPropagation();
        	var consumerid=$("#consumerid").val();
        	var send_data = "consumerid=" + consumerid;
        	$.getJSON(APP_URL+'/ajax/otpsend', send_data, function(data) {
                    alert(send_data);
        	});
        	
        });
        
        $("#otpsubmit").click(function(e){
        	
        	//e.stopPropagation();

        	var send_data = "conid=" + $("#conid").val() +"&walletotp="+$("#walletotp").val();
        	$.getJSON(APP_URL+'/ajax/walletotpsubmit', send_data, function(data) {
                alert(send_data);
        	});
        	
        });
        
        $("#addbf").click(function(e){
        	
        	//e.stopPropagation();
		//alert('hi');
        	var send_data = "bfacountno=" + $("[name='bfacountno']").val() +"&bfaccounttype="+$( "#bfaccounttype option:selected" ).text()+"&bfname="+$("[name='bfname']").val()+"&bfmobileno="+$("[name='bfmobileno']").val()+"&consumerid="+$("[name='consumerid']").val()
        	+"&ifsccode="+$("[name='ifsccode']").val()+"&address="+$("[name='address']").val()+"&mobileno="+$("[name='mobileno']").val();
        	$.getJSON(APP_URL+'/ajax/addbf', send_data, function(data) {
				//alert(data.status);
        			if(data.status == 'success'){
        				if(data.status_msg=='exists'){
        					$('#moneyTransfer').show();
        					$('#BeficierDetails').hide();
							$('#addbf').hide();
        					$("[name='benificeryCode']").val(data.BeneficiaryCode);
							$("[name='mobileno']").val($("[name='bfmobileno']").val());
        				}
        			}
        	});
        	
        });
        
        $("#sendMoney").click(function(e){
        	
        	//e.stopPropagation();

        	var send_data = "amountToBeTrnsfered=" + $("[name='amountToBeTrnsfered']").val() +"&otpCode="+$("[name='otpCode']").val()+"&consumerid="+$("[name='consumerid']").val()
        	+"&mobileno="+$("[name='mobileno']").val()+"&benificeryCode="+$("[name='benificeryCode']").val();
        	$.getJSON(APP_URL+'/ajax/sendMoney', send_data, function(data) {
				alert(data.message);
        			if(data.status == 'success'){
        				$('#moneyTransferButton').after('<div>'+data.message+'</div>');
        			}
        	});
        	
        });
        
        
	
});

function updateTextArea() {

    var allVals = [];

    $('#interest_list :checked').each(function () {

        allVals.push($(this).val());

    });
    register.interest_list=allVals;
    
    
    //$('#txtValue').val(register.interest_list)
    //console.log(register.interest_list);

}

function recharheOptions(operator,circle) {
	$('#topup,#fulltalktime,#twog,#threeg,#sms,#other').html('<div style="text-align: center; padding: 30px 0px;"><img src="'+APP_URL+'/resource/images/loader.gif" alt=""></div>');
	var send_data = "operator=" + operator +"&circle=" + circle;
	$.getJSON(APP_URL+'/ajax/recharheOptions', send_data, function(data) {
		register.call=true;
		var topup='';
		var fulltalktime='';
		var twogdata='';
		var threeg='';
		var smspack='';
		var other='';
		$.each( data, function( key, value ) {
			
			if(value.length == 0){
				if(key=="topups"){
					$('#topup').html('<span>We do not have details of top up plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
				if(key=="fulltalktime"){
					$('#fulltalktime').html('<span>We do not have details of full talktime plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
				if(key=="twogdata"){
					$('#twog').html('<span>We do not have details of 2G plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
				if(key=="threegdata"){
					$('#threeg').html('<span>We do not have details of 3G plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
				if(key=="other"){
					$('#other').html('<span>We do not have details of other plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
				if(key=="roaming"){
					$('#sms').html('<span>We do not have details of Roaming plans for this operator. If you know of any recharge amount, you can recharge with that amount.</span>');
				}
			}
			  
			  $.each( value, function( k, val ) {
/*				  var recharge_validity=($.inArray(val.recharge_validity.trim(), ["Nil", "0 Days","NA","-"]) != -1)?'Unlimited' : val.recharge_validity;
				  if(!recharge_validity){
					  recharge_validity='Unlimited';
				  }
				  var recharge_amount='';
				  if(operator == 'BSNL'){
					  recharge_amount=(val.recharge_amount)?val.recharge_amount:val.recharge_value;
				  }else{
					  recharge_amount=val.recharge_value;
				  }*/
				  
				  if(key == 'topups'){
					  topup+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'TOPUP\')">'
					  	  	+'<div class="col-md-2 recharge_value" ><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
					  	  	+'<div class="col-md-10">'
							+'<div class="row">'
							+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
							+'</div>'
							+'<div class="row">'
							+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
							+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
							+'</div>'
							+'</div>'
							+'</div>';
					  $('#topup').html(topup);
				  }else if(key == 'fulltalktime'){
					  fulltalktime+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'Special Recharge\')">'
					  	  	+'<div class="col-md-2 recharge_value" style="background:#FF7400;"><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
					  	  	+'<div class="col-md-10">'
							+'<div class="row">'
							+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
							+'</div>'
							+'<div class="row">'
							+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
							+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
							+'</div>'
							+'</div>'
							+'</div>';
					  $('#fulltalktime').html(fulltalktime);
				  }else if(key == 'twogdata'){
					  twogdata+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'Special Recharge\')">'
				  	  	+'<div class="col-md-2 recharge_value" style="background:#78AD05;"><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
					  $('#twog').html(twogdata);
				  }else if(key == 'threegdata'){
					  threeg+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'Special Recharge\')">'
				  	  	+'<div class="col-md-2 recharge_value" style="background:#3498DB;"><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
					  $('#threeg').html(threeg);
					  
				  }else if(key == 'roaming'){
					  smspack+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'Special Recharge\')">'
				  	  	+'<div class="col-md-2 recharge_value" style="background:#FC4926;"><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
					  $('#sms').html(smspack);
					  
				  }else if(key == 'other'){
					  other+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'mob_amount\',\'Special Recharge\')">'
				  	  	+'<div class="col-md-2 recharge_value" style="background:#3A5795;"><i class="fa fa-inr"></i>'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+getWords(val.recharge_longdesc,45)+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info">Talktime | '+val.recharge_talktime+'</div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
					  $('#other').html(other);
				  }
				  
			  
				  });

			  });
		
		//$('#topup').html(topup);
		
	});

}

function planFunc(no,id,type){
	$('#'+id).val(no);
	//$("[name='inputammount']").val(no);
	$("select[name^='rtype'] option[value='"+type+"']").attr("selected","selected");
	$("#mob-plans,#datacard-plans,#dth-plans").hide();
	$(".video_sec").show();
	
	//paymentInfo(no);
	
}

function dthRechargePlans(data){
	var monthly='';
	var threemonth='';
	var sixmonth='';
	var annual='';
	$.each( data, function( key, value ) {
	
	if(value){
		$.each( value, function( k, val ) {
			  if(key == 'monthly'){
				  monthly+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'dth_amount\')">'
				  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info"></div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
				  $('#monthlypack').html(monthly);
				  
			  }else if(key == 'threemonth'){
				  threemonth+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'dth_amount\')">'
			  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
			  	  	+'<div class="col-md-10">'
					+'<div class="row">'
					+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
					+'</div>'
					+'<div class="row">'
					+'<div class="col-md-6 plan_info"></div>'
					+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
					+'</div>'
					+'</div>'
					+'</div>';
				  $('#threemonthpack').html(threemonth);
				  
			  }else if(key == 'sixmonth'){
				  sixmonth+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'dth_amount\')">'
			  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
			  	  	+'<div class="col-md-10">'
					+'<div class="row">'
					+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
					+'</div>'
					+'<div class="row">'
					+'<div class="col-md-6 plan_info"></div>'
					+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
					+'</div>'
					+'</div>'
					+'</div>';
				  $('#sixmonthpack').html(sixmonth);
				  
			  }else if(key == 'annual'){
				  annual+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'dth_amount\')">'
			  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
			  	  	+'<div class="col-md-10">'
					+'<div class="row">'
					+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
					+'</div>'
					+'<div class="row">'
					+'<div class="col-md-6 plan_info"></div>'
					+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
					+'</div>'
					+'</div>'
					+'</div>';
				  $('#annualpack').html(annual);
				  
			  }
		});
		}
	});
	
}

function datacardRecharheOptions(operator,circle){
	var send_data = "operator=" + operator +"&circle=" + circle;
	
	
	$.getJSON(APP_URL+'/ajax/datacardRecharheOptions', send_data, function(data) {
		alert(send_data);
		var twog='';
		
		var threeg='';

		$.each( data, function( key, value ) {	
		if(value){
			$.each( value, function( k, val ) {
				  if(key == '2G'){
					  twog+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'data_amount\')">'
					  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
					  	  	+'<div class="col-md-10">'
							+'<div class="row">'
							+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
							+'</div>'
							+'<div class="row">'
							+'<div class="col-md-6 plan_info"></div>'
							+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
							+'</div>'
							+'</div>'
							+'</div>';
					  $('#twogdata').html(twog);
					  
					  
				  }else if(key == '3G'){
					  threeg+='<div class="row plan_row" onClick="planFunc('+val.recharge_amount+',\'data_amount\')">'
				  	  	+'<div class="col-md-2 recharge_value">&#8377;'+val.recharge_amount+'</div>'
				  	  	+'<div class="col-md-10">'
						+'<div class="row">'
						+'<div class="col-md-12 recharge_desc">'+val.recharge_longdesc+'</div>'
						+'</div>'
						+'<div class="row">'
						+'<div class="col-md-6 plan_info"></div>'
						+'<div class="col-md-6 plan_info">Validity | '+val.recharge_validity+'</div>'					  
						+'</div>'
						+'</div>'
						+'</div>';
					  $('#threegdata').html(threeg);
					  
				  }
				
			});
			
			
			}
		});
	
	});
}

function getWords(str, no) {
    return str.split(/\s+/).slice(0,no).join(" ");
}


window.fbAsyncInit = function() {
	FB.init({
	appId      : '1161053137255429', // replace your app id here
	channelUrl : APP_URL, 
	status     : true, 
	cookie     : true, 
	xfbml      : true,
	version    : 'v2.5'  
	});
	
};

(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = APP_URL+'/resource/js/fball.js';
	ref.parentNode.insertBefore(js, ref);
}(document));
//////////////////////////
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //testAPI();
	  window.location = APP_URL+'/register';
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  //////////////////////////
function FBLogin(str){

	FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     var ref_code = $('#ref_code').val();
	 var reg_phn = $('#reg_phn').val();
     var send_data = "ref_code=" + ref_code +"&reg_phn=" + reg_phn;
	 //alert(send_data);
     
     $.getJSON(APP_URL+'/ajax/fbactions', send_data, function(data) {
			if(data.check == 'regsuccess'){
				$(location).attr("href",APP_URL+"/register");
			}
			else if(data.check == 'logsuccess'){
				$(location).attr("href",APP_URL+"/user");
			}
			else if(data.check == 'reg_code_limit'){
				$("#limit_otp").modal("toggle");
			}
			else if(data.check == 'reg_code_error'){
				$("#wrong_otp").modal("toggle");
			}
		});
		console.log(send_data);
		
    } else {
     console.log('User cancelled login or did not fully authorize.');
    
}
}, {scope: 'email,user_friends'});


}

//Check to see if the window is top if not then display button

$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollToTop').fadeIn();
	} else {
		$('.scrollToTop').fadeOut();
	}
});


//Click event to scroll to top

$('.scrollToTop').click(function(){
	$('html, body').animate({scrollTop : 0},800);
	return false;
});

/*social media code | Shubhajit Halder | Wolabi*/
jQuery(document).ready(function($) {	

  //follow people
  
 $('.followit').on('click', function (e) {
	  $(this).html('<i class="fa fa-check"></i> Following');
	  $(this).removeClass('followit');
	  $(this).addClass('unfollowit');
	//$(this).hide();
	var following = $(this).attr('id');
	//alert(following);
	
	var send_data = "following=" + following;
	
	
		$.getJSON(APP_URL+'/user/follow_people', send_data, function(data) {
			if(data.message == 'success'){
				
			}
		});
	
});

 //unfollow people
  
  $('.unfollowit').on('click', function (e) {
	  $(this).html('<i class="fa fa-user-plus"></i> Follow');
	  $(this).removeClass('unfollowit');
	  $(this).addClass('followit');
	//$(this).hide();
	var unfollow = $(this).attr('id');
	//alert(following);
	
	var send_data = "unfollow=" + unfollow;
	
	
		$.getJSON(APP_URL+'/user/unfollow_people', send_data, function(data) {
			if(data.message == 'success'){
				
			}
		});
	
});
  //like image
  
$('.like_emos').on('click', function (e) {
	 var liketype =  $(this).attr('data-tag');
	 var image_id = $(this).attr('id');
	 var likeico = $(this).attr('data-ico');
	
	
	var send_data = "image_id=" + image_id + "&liketype=" + liketype;
	$(this).parent(".like_popup").siblings(".likebut").children("i").removeClass();
	$(this).parent(".like_popup").siblings(".likebut").children("i").addClass(likeico);
	
	$(".like_popup").hide("fast");

	
		$.getJSON(APP_URL+'/user/imagelike', send_data, function(data) {
			if(data.check == 'success'){
				alert("done");
				
			}
		});
	
});
  //unlike image
  
  $('.unlike').on('click', function (e) {
	  $(this).removeClass('unlike');
	  $(this).addClass('like')
	  $(this).find('i').removeClass('fa-heart');
	  $(this).find('i').addClass('fa-heart-o');
	  var lcount = $(this).find('span').text();
	  var new_lcount = parseInt(lcount) - 1;
	  $(this).find('span').text(new_lcount);
	  
	var image_id = $(this).attr('id');
	
	var send_data = "image_id=" + image_id;
	
	
		$.getJSON(APP_URL+'/user/imageunlike', send_data, function(data) {
			if(data.message == 'success'){
				
			}
		});
	
});

 //search people
	   
	   $("#cincio_search_box").keyup(function() 
		{ 
		var selectedValue = this.value;
		//alert(selectedValue);
		if(selectedValue != null)
		{
			$.ajax({
			url: APP_URL+'/ajax/searchpeople',
			type: 'POST',
			data: {option : selectedValue},
			success: function(result) {
				$("#cincio_search_result").show();
			   $("#cincio_search_result").html(result);
				}
			});
		}
		});

});


$(document).ready(function(){
	
	//state mapping
	$("#state").change(function() {
		//get the selected value
		var selectedValue = this.value;
		//alert(selectedValue);
		//make the ajax call
		$.ajax({
			url: APP_URL+'/ajax/state_mapping',
			type: 'POST',
			data: {option : selectedValue},
			success: function(result) {
			   $("#city").html(result);
			}
		});
	});
	
	
	$("#cincio2ndmenu").click(function() {
	 
	 $("#c_ul").toggle("fast");
	
     });
	 
	 $(".likebut").click(function() {
	 
	 $(this).siblings(".like_popup").toggle("fast");
	
     });
	 
	 //upload feed
	 $("#social_feed").submit(function() {
     var formData = new FormData($(this)[0]);

		$.ajax({
			url: APP_URL+'/user/uploadmedia',
			type: 'POST',
			data: formData,
			async: false,
			success: function (data) {
				$('#social_feed')[0].reset();
				$("#feeimg").fadeIn("slow").css('opacity','0');
			},
			cache: false,
			contentType: false,
			processData: false
			
		});
	
		return false;
	});
	
	 $(".express_dp_color_palate").click(function() {
	 
	 var express_dp_color_palate = $(this).attr('id');
	 //alert(express_dp_color_palate);
	 $(".express_dp").css("background-color", "#"+express_dp_color_palate);
	 $("#express_color_code").val(express_dp_color_palate);
	
     });
	 
	 
	 	 //post comment

$(".chik_commentbox").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
		
        var comment_text = $(this).val();
		var post_id = $(this).attr('id');
		var user_id = $(this).attr('user');
		
		//alert(comment_text);
		//alert(post_id);
		//alert(user_id);
		
		var send_data = "comment_text=" + comment_text + "&post_id=" + post_id + "&user_id=" + user_id;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/givecomment', send_data, function(data) {
			if(data.check == 'success'){
				
				$.ajax({ url: APP_URL+'/ajax/get_comments',
				data : send_data,
				success: function(result) {
					   $("#lc-"+post_id).html(result);
					  // alert("done");
					}
				});
				
			}
		});
		$('.chik_commentbox').val("");
		
		
    }
});
//view more comments

$(".viw_more_cmnt").click(function() {
	
	if($(this).hasClass("more")) {
	 
	 $(this).siblings(".comment_section").css("overflow-y", "scroll").css("max-height", "500px");
	 $(this).html("Less Comment");
	 $(this).removeClass("more");
	 $(this).addClass("less");
	}
	else if($(this).hasClass("less")) {
	 
	 $(this).siblings(".comment_section").css("overflow-y", "hidden").css("max-height", "200px");
 	 $(this).html("View more Comment");
	 $(this).removeClass("less");
	 $(this).addClass("more");
	}
	
});

//noti close
$(".lc_noti").click(function() {
	$(this).children("span").hide("fast");
	var noti_for = $(this).attr('id');
	
	var send_data =  "noti_for=" + noti_for ;
	
	$.getJSON(APP_URL+'/ajax/update_notifications', send_data, function(data) {
	  });
	
});

//fnoti close
$(".f_noti").click(function() {
	$(this).children("span").hide("fast");
	var fnoti_for = $(this).attr('id');
	
	var send_data =  "fnoti_for=" + fnoti_for ;
	
	$.getJSON(APP_URL+'/ajax/update_follower_notifications', send_data, function(data) {
	  });
	
});

//show messagea
$(".feed_header").click(function() {
	$(this).siblings(".msg_body").toggle();
	/*var fnoti_for = $(this).attr('id');
	
	var send_data =  "fnoti_for=" + fnoti_for ;
	
	$.getJSON(APP_URL+'/ajax/update_follower_notifications', send_data, function(data) {
	  });*/
	
});
//go to mssg page
$("#mssgages").click(function() {
	$(location).attr("href",APP_URL+"/user/messages");
});

//dlt msg noti
//go to mssg page
$(".main_center_md_single").click(function() {
	
	var msg_noti_id = $(this).attr('id');
	var send_data = "msg_noti_id="+msg_noti_id;
	$.getJSON(APP_URL+'/user/read_msg', send_data, function(data) {
			if(data.check == 'success'){
				$(this).children(".feed_header msg_head").children(".badge").hide();
				
			}
		});
});
	
	 //send msg
	 $("#msgsender").submit(function() {
     var formData = new FormData($(this)[0]);

		$.ajax({
			url: APP_URL+'/ajax/send_message',
			type: 'POST',
			data: formData,
			async: false,
			success: function (data) {
				$('#msgsender')[0].reset();
				 //$("#feeimg").fadeIn("slow").css('opacity','0');
			},
			cache: false,
			contentType: false,
			processData: false
			
		});
	
		return false;
	});
	//send msg in chat
	$(".msg_textarea").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
		
        var msg_text = $(this).val();
		var rcv_id = $(this).attr('id');
		
		//alert(comment_text);
		//alert(post_id);
		//alert(user_id);
		
		var send_data = "msg_text=" + msg_text + "&rcv_id=" + rcv_id;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/send_message', send_data, function(data) {
			if(data.check == 'success'){
				
				$.ajax({ url: APP_URL+'/ajax/get_chat',
				data : send_data,
				success: function(result) {
					   $("#sender-"+rcv_id).html(result);
					  // alert("done");
					},
					cache: false,
			contentType: false,
			processData: false
				});
				
			}
			
		});
		$('.msg_textarea').val("");
		
		
    }
});
$(".chatbox_head").click(function(){
	
	$(".sidebar-name").toggle();
});
$("#reg_phn").on('keyup', function(){
	
	var value = $(this).val();
	var value_l = $(this).val().length;
	if(value_l == 10)
	{
		var send_data = "check_mobile=" + value;
	//alert(send_data);
	
	
		$.getJSON(APP_URL+'/ajax/check_mobile', send_data, function(data) {
			if(data.check == 'unsuccess'){
				alert("MOBILE NUMBER ALREADY REGISTERED. We know that everyone wants to be at Chikoop but you are already registered, try recover your password, in case you have forgotten your password.");
				$("#reg_phn").css('border','1px solid #f00');
			}
			else if(data.check == 'success')
			{
				$("#reg_phn").css('border','1px solid #090');
			}
		});
	}
});
});
 //trending
$(document).ready(function(){
$.ajax({ url: APP_URL+'/ajax/get_trending',
        context: document.body,
        success: function(result) {
			   $(".mytrendings").html(result);
			}
		});
});
function refresh_chat()
{
	//send msg in chat

   

		var rcv_id = $(".refreshmsg").attr('id');
		
		//alert(comment_text);
		//alert(post_id);
		//alert(user_id);
		
		var send_data = "&rcv_id=" + rcv_id;
	//alert(send_data);
	
	
		
				
				$.ajax({ url: APP_URL+'/ajax/get_chat',
				data : send_data,
				success: function(result) {
					   $("#sender-"+rcv_id).html(result);
					  // alert("done");
					},
					cache: false,
			contentType: false,
			processData: false
				});
}
window.onload = function() {            

    setInterval(refresh_chat, 5000);
}
 //who to follow
$(document).ready(function(){
$.ajax({ url: APP_URL+'/ajax/get_people',
        context: document.body,
        success: function(result) {
			   $(".follow_suggestion").html(result);
			}
		});
		
});

 //popular 24
$(document).ready(setInterval(function(){
$.ajax({ url: APP_URL+'/ajax/popular24',
        context: document.body,
        success: function(result) {
			   $(".my_popular").html(result);
			}
		}); 
	}, 5000));