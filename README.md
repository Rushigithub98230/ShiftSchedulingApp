<h1>Schedule Management App</h1>

<p>
  This Angular application provides a calendar-based schedule management system. 
  It allows users to create, view, and manage employee schedules for different shifts on a monthly calendar view. 
  No backend is involved, and all data is stored locally within the Angular app.
</p>

<h2>Features</h2>
<ul>
  <li><b>Calendar View:</b> View schedules in a monthly calendar format using the <code>mwl-calendar-month-view</code> component.</li>
  <li><b>Create Schedule:</b> Add new schedules for employees with specific shift details such as shift type, start time, end time, and weekday.</li>
  <li><b>Recurring Shifts:</b> Schedules for specific weekdays (e.g., Monday, Tuesday) are automatically applied to all occurrences of that day in the current month.</li>
  <li><b>Shift Handling:</b> Each schedule is categorized as either a "Day Shift" or "Night Shift" based on the shift ID.</li>
</ul>

<h3>Tech Stack</h3>
<ul>
  <li><b>Angular:</b> A platform for building web applications.</li>
  <li><b>mwl-calendar:</b> A calendar library used to display the calendar view.</li>
  <li><b>date-fns:</b> A lightweight date utility library for handling date manipulations.</li>
</ul>

<h3>Installation</h3>
<p>Follow these steps to set up and run the project locally.</p>
<ol>
  <li><b>Clone the repository:</b>
    <pre>git clone https://github.com/your-username/schedule-management-app.git</pre>
  </li>
  <li><b>Install dependencies:</b>
    <pre>cd schedule-management-app && npm install</pre>
  </li>
  <li><b>Install Angular Calendar and date-fns:</b>
    <pre>npm install angular-calendar date-fns</pre>
  </li>
  <li><b>Import the required modules:</b>
    <p>In <code>app.module.ts</code>, add the necessary imports:</p>
    <pre>
      import { CalendarModule, DateAdapter } from 'angular-calendar';
      import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
    </pre>
  </li>
  <li><b>Run the application:</b>
    <pre>ng serve</pre>
  </li>
</ol>

<h3>Usage</h3>
<p>The application allows users to:</p>
<ul>
  <li>View employee schedules in a monthly calendar.</li>
  <li>Add new schedules with employee details (name, shift, start time, end time, etc.).</li>
  <li>Schedules are automatically applied to all occurrences of the selected weekday for the current month.</li>
</ul>
