# BrokereeSolutionsTestTask
Client and backend apps are hosted separately, with <code>npm start</code> client app will listen on "http://localhost:3000" and with <code>dotnet run</code> server will listen on "http://localhost:5000"

<b>Not covered, i consider it as errors:</b>
<ul>
  <li>If resource updation fails - it will not be shown on UI</li>
  <li>If resource creation fails - inputs will be cleared</li>
  <li>If inputs are filled and we close resource creation form error - input will be cleared
</ul>
