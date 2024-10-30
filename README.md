Backend: MongoDB, Express, Node.js
Frontend: React, Redux, RTK Query
Styling: ShadCN


Implemented Features:

Create: Users can add tasks with a title, description, date & time.

Edit: Update any task attribute.

Delete: Remove tasks from the list.

Search: Find tasks by keywords in title or description.

Home Screen Overview

Weekly Grouping: Tasks are organized by week (Mon-Sun).
Task Summary Cards: Each week displays the number of open and completed tasks, with an expandable view for details.
Task Status Update

Users can mark tasks as Completed or Pending, updating weekly progress indicators.

fontend env
VITE_TASK_API_BASE_URL= http://localhost:3000/api

backend env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.0jedu.mongodb.net/
DB_NAME=tasks
