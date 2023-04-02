import * as Yup from 'yup'

const newResident = Yup.object({
  flatNumber: Yup.number()
    .typeError('Bu alana sadece sayı giriniz.')
    .required('Bu alan boş bırakılamaz.')
    .min(0, '0 dan daha küçük bir rakam girilemez.')
    .max(10000, '10000 den fazla olamaz'),
  firstName: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .min(3, 'En az 3 karakter olmalıdır.')
    .max(50, 'En fazla 50 karakter olabilir.'),
  lastName: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .matches(/^\S*$/, 'Boşluk içeremez.')
    .min(3, 'En az 3 karakter olmalıdır.')
    .max(30, 'En fazla 30 karakter olabilir.'),
  phone: Yup.number().typeError('Bu alana sadece sayı giriniz.'),
  phone2: Yup.number().typeError('Bu alana sadece sayı giriniz.'),
  carPlate: Yup.string()
})

export { newResident }
