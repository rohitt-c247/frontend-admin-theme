// Category validation schema
import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
    categoryType: Yup.string().required('Category type is required'),
    status: Yup.string().required('Status is required'),
    // createdBy: Yup.string().required('Created by is required'), // Ensure createdBy is included
  });