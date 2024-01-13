# Employee-Ease
Employee Ease is a comprehensive HR management web application built with React, Express, and MySQL, streamlining employee onboarding, bulk uploads, and communication within a company.
## How to use this project

1. Clone the GitHub repository to your local machine.

   ```bash
   git clone https://github.com/AbuSuraj/EmployeeEase-client.git

2. Navigate to the project directory.

   ```
    cd EmployeeEase-client.

3. Install the project dependencies using npm.
   ``` 
   npm install.
4. Run the following command
   ```
   npm start
## Project live site link:
https://employee-ease.netlify.app/
## Used Features
 - useState
 - useEffect
 - formik form
 - React-paginate
 - Bootstrap table
## Projecy Description
**Add New Employee:**
   - Utilised <b>formik</b> form to add new employees.
   - Validated all fields before adding.
   - Displayed validation errors properly.
   - Ensured a good UI and UX for the form.

 **Bulk Employee Upload:**
   - Created an HTML form to upload a CSV file.
   - Supported drag and drop file upload.
   - Displayed validation errors properly.
   - Ensured a good UI and UX for the form.
   - The CSV file contains at least 3 columns: first name, last name, email address.
   - Ignored any other columns in the CSV.
   - Added valid lines from the CSV file to the database as employees.
   - Displayed the count of employees added and failed.

 **View All Employees:**
   - Created a table listing all the employees added.
   - Displayed 5 employees at a time.
   - Implemented pagination buttons for previous/next pages.
   - Ensured a good UI and UX for the table.

 **Send Emails:**
   - Selected employees from the table using checkboxes.
   - Created a modal within a  form to compose emails with Subject and Body fields.
   - Displayed validation errors properly.
   - Ensured a good UI and UX for the email composition form.
   - Used a Brevo service for the email composition (https://app.brevo.com)

**Note:** While utilizing confidential keys on Vercel for production, occasional email delivery delays may occur. It's essential to recognize that this phenomenon is unique to the production environment, with locally-run instances demonstrating optimal performance. 
