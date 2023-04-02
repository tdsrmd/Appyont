import * as Yup from 'yup'

const stepOne = Yup.object({
  name: Yup.string().required('Bu alan boş bırakılamaz.')
})

const stepTwo = Yup.object({
  monthlyDuesAmount: Yup.number('Bu alana sadece sayı yazınız.')
    .typeError('Bu alana sadece sayı giriniz.')
    .min(50, 'Aylık aidat 50 TL den az olamaz.')
    .max(5000, 'Aylık aidat 5000 TL den fazla olamaz.')
    .required('Bu alan boş bırakılamaz.')
})

const stepThree = Yup.object({
  till: Yup.number('Bu alana sadece sayı yazınız.')
    .typeError('Bu alana sadece sayı giriniz.')
    .min('0', 'Kasa 0 TL den az olamaz.')
    .max('1000000', 'Kasa 1 milyon TL den fazla olamaz.')
    .required('Bu alan boş bırakılamaz.')
})

const stepFour = Yup.object({
  username: Yup.string().required('Bu alan boş bırakılamaz.').matches(/^\S*$/, 'Boşluk içeremez.'),
  password: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .min(6, 'Şifreniz en az 6 karakter içermeli')
    .max(16, 'Şifre en fazla 16 karakter içerebilir'),
  passwordAgain: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
})

export { stepOne, stepTwo, stepThree, stepFour }
