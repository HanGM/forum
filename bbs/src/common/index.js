var checkUser = (rule, value, callback) => {
	if(!value.match(/^\w{6,12}$/)) {
		callback(new Error('需要6-12位数字、字母、下划线组合'))
	} else {
		callback()
	}
};
var checkPass1 = (rule, value, callback) => {
	if(!value.match(/^[\da-zA-Z]{6,12}$/)) {
		callback(new Error('需要6-12位数字、字母组合'))
	} else {
		callback()
	}
};
var checkNick = (rule, value, callback) => {
	if(!value.match(/^[\u4e00-\u9fa5]{1,12}$/)) {
		callback(new Error('请输入您的中文昵称，不得超过12个汉字'))
	} else {
		callback()
	}
};
var checkName = (rule, value, callback) => {
	if(!value.match(/^[\u4e00-\u9fa5]{1,4}$/)) {
		callback(new Error('请输入您的真实中文姓名，4个汉字以内'))
	} else {
		callback()
	}
};
var checkIdcard = (rule, value, callback) => {
	if(!value.match(/^\d{6}(19|2[01])\d\d((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))\d{3}(\d|X)$/)) {
		callback(new Error('请输入您的真实的身份证号码'))
	} else {
		callback()
	}
};
var checkPhone = (rule, value, callback) => {
	if(!value.match(/^1(([358]\d)|66|7[789]|9[89])\d{8}$/)) {
		callback(new Error('请输入您的正确手机号码'))
	} else {
		callback()
	}
};
export default {
	checkUser,
	checkPass1,
	checkNick,
	checkName,
	checkIdcard,
	checkPhone
}
