// Category validation schema
const categoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
    categoryType: Yup.string().required('Category type is required'),
    status: Yup.string().required('Status is required'),
  });