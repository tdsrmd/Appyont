import * as Yup from 'yup'

const newExpense = Yup.object({
	type: Yup.string().required('Bu alan boş bırakılamaz.'),
	amount: Yup.number()
		.required('Bu alan boş bırakılamaz.')
		.min(0, '0 dan az olamaz')
		.max(1000000, '1,000,000 den fazla olamaz')
		.typeError('Bu alana sadece sayı giriniz.'),
	description: Yup.string()
		.required('Bu alan boş bırakılamaz.')
		.min(3, 'En az 3 karakter girmelisiniz.')
		.max(80, 'En fazla 80 karakter girebilirsiniz.')
})

export { newExpense }
