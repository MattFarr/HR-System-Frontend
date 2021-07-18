# HR-System-Frontend

HR-System-Frontend

## Tech Stack

- React
- Redux
- Typescript
- Formik
- Yup
- Material-UI
- Loadash

## Assumptions

- Third party plugins such as MUI Datagrids and React Datagrids were not taken into consideration for this test.

- The file was modified slightly and three new fields were added: title, grade and manager.

- The Employee id is randomly generated, with no validation, when you add an employee. This is only for this program's purposes. Usually the id is given by the server and validated for uniquness on entry and on saving.

- Sort, Search functions are altering data for presentation purposes, the result is not kept in Redux State. This would be the case if the app is server/backend managed and the sort and search state will be retrieved via API's.

- For the purpose of this test, currency was not taken into consideration when sorting by salary; only the amount was used.

- When adding a new employee sort is persisted but filter is cleared.

- The New employee form provides basic validation, no complex validation was introduced.

- All functionality is presented in one dashboard: Adding / Deleting / Data Viewing / Searching / Sorting / Export. As such no routing or different pages were introduced.

## Improvements :

- The UI is a basic implementation to showcase a simple dashboard, can be enhanced further.

- On search a debounce can be used, but since this is only a test project and there are no API calls there was no need for a debounce implementation.

- Re-usable form (Formik) components. In real life code, would be ideal to create reusable field components that can be re-used across multiple forms without the need. For the purpose of this test, the form is in one component.

- Sorting by salary can take into consideration currency conversion to order by the actual value across different currencies or introduce a data filter which will show only users of a specific currency.
