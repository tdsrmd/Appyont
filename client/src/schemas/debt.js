import * as Yup from 'yup'

const addDept = Yup.object({
  picket: Yup.string(),
  amount: Yup.number().typeError('Bu alana sadece sayı giriniz.').required('Bu alan boş bırakılamaz.'),
  date: Yup.date().required('Bu alan boş bırakılamaz.'),
  type: Yup.string().required('Bu alan boş bırakılamaz.'),
  description: Yup.string()
    .required('Bu alan boş bırakılamaz.')
    .min(3, 'En az 3 karakter girmelisiniz.')
    .max(50, 'En fazla 50 karakter girebilirsiniz.'),
  residentId: Yup.string().when('picket', {
    is: 'singular',
    then: (schema) => schema.required('Bu alan boş bırakılamaz.')
  })
})

export { addDept }
