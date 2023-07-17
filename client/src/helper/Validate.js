import * as Yup from "yup";

const firstNameValidate = {
    firstName:Yup.string().required("Required")
}
const LastNameValidate = {
    lastName:Yup.string().required("Required")
}
const emailValidate ={
    email:Yup.string().email("Invalid email address").required("Required")
}
const passwordValidate = {
    password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}
const otpValidate = {
    otp: Yup.number().positive().required("Required")
         .test("maxLenght", "Max 6", val => !isNaN(val) && `${val}`.length <= 6)
}
const confirmPasswordValidate = {
    confirmPassword: Yup.string()
            .required('No password provided.') 
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
            })    
};

// accept term and condition validate
const acceptRule={
  acceptConditions:Yup.bool() 
  .oneOf([true], "You must accept the terms and conditions")
}

const GenderValidate={
  gender:Yup.string().required('select gender') 
}

const setupNewPassword = {
  ...passwordValidate
}

// Login page
export const SchemaLoginValidation = Yup.object().shape({
    ...emailValidate,
    ...passwordValidate
  });
  
// Register page
 export const SchemaRegisterValidation = Yup.object().shape({
    ...firstNameValidate,
    ...LastNameValidate,
    ...emailValidate,
    ...GenderValidate,
    ...passwordValidate,
    ...confirmPasswordValidate,
    ...acceptRule
  })
   
//Forgot page
export const SchemaOTPValidation = Yup.object().shape({
    ...otpValidate
})
//Reset page
export const SchemaResetPasswordValidation = Yup.object().shape({
    ...setupNewPassword
})
