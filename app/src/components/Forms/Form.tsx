import { Formik, Field } from "formik";

function FormFormik(props: any) {
  const { initialValues, onSubmit, validationSchema, children } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
