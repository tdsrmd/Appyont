import * as Yup from 'yup'

const loginSchema = Yup.object({
  username: Yup.string().required('Bu alan boş bırakılamaz.'),
  password: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .min(6, 'Şifreniz en az 6 karakter içermeli')
    .max(16, 'Şifre en fazla 16 karakter içerebilir')
})
const registerSchema = Yup.object({
  firstName: Yup.string().required('Bu alan boş bırakılamaz.'),
  lastName: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .matches(/^\S*$/, 'Boşluk içeremez.'),
  username: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .matches(/^\S*$/, 'Boşluk içeremez.'),
  password: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .min(6, 'Şifreniz en az 6 karakter içermeli')
    .max(16, 'Şifre en fazla 16 karakter içerebilir'),
  passwordAgain: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
})

const residentsAuth = Yup.object({
  username: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .matches(/^\S*$/, 'Boşluk içeremez.'),
  password: Yup.string()
    .min(6, 'Şifreniz en az 6 karakter içermeli')
    .max(16, 'Şifre en fazla 16 karakter içerebilir'),
  passwordAgain: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .when('password', {
      is: (val) => val !== null && val !== undefined && val !== '',
      then: (schema) => schema.required('Bu alan boş bırakılamaz.')
    })
})

export { loginSchema, registerSchema, residentsAuth }
