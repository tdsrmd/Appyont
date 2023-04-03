import * as Yup from 'yup'

const updateApartment = Yup.object({
  name: Yup.string().required('Bu alan boş bırakılamaz.'),
  monthlyDuesAmount: Yup.number()
    .typeError('Bu alana sadece sayı giriniz.')
    .min(50, 'Aylık aidat 50 TL den az olamaz.')
    .max(5000, 'Aylık aidat 5000 TL den fazla olamaz.')
    .required('Bu alan boş bırakılamaz.')
})

const updateManager = Yup.object({
  firstName: Yup.string().required('Bu alan boş bırakılamaz.'),
  lastName: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .matches(/^\S*$/, 'Boşluk içeremez.'),
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

export { updateApartment, updateManager }
