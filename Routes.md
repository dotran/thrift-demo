# Routes

### GET - /  
Display the home screen for login, or if the user is authenticated it will display the current tasks  

**Returns**  
```
index.html
```

## USER
### POST - /users/signup
Create user account based on credentials

**Accepts (JSON)**

```
{
	"name": "",
	"username": "",
	"password": ""
}
```

**Returns (JSON)**

```
{
	"token": "", //Access token string
	"userId": "", //userId
	"ttl": 0 //access token time to live (seconds)
	"createdOn": "" //date in ISO format
}
```

### POST - /users/login
Login users based on credentials

**Accepts (JSON)**

```
{
	"username": "",
	"password": ""
}
```

**Returns (JSON)**

```
{
	"token": "", //Access token string
	"userId": "", //userId
	"ttl": 0 //access token time to live (seconds)
	"createdOn": "" //date in ISO format
}
```

## TASKS
### Requirements
All methods listed below require authorization and must include the following authorization header:

Key  | Value
------------- | -------------
Authorization  | <mark>Access token</mark>

### TASK OBJECT
Below is described the basic schema for a **Task**

```
{  
	"id": "", //Task ID - string
	"userId": "", //User ID - string
	"name": "", //Name of the task - string
	"createdOn": "", //Date when the task was created - date in ISO format
	"done": false //Done flag for task - boolean
}  
```

### GET - /tasks
Returns the list of tasks for the current user based on the Logged user 
 
**Returns - Array of Task**  

```
[
	{  
		"id": "",
		"userId": "",
		"name": "",
		"createdOn": "",
		"done": false
	}  
]
```
by default all the tasks are sorted by ```createdOn``` in decremental order (newer comes first)

### POST - /tasks
Adds a new task to the current user list

**Accepts (JSON)**

```
{
	"name": ""
}
```

**Returns**

The newly created **Task**

### PUT - /tasks  
Updates a task for the current user

**Accepts (JSON)**

```
{
	"id": "",
	"name": "", //optional
	"done": false //optional
}
```

if neither ```"name"``` or ```"done"``` are provided the **Task** will not be updated

**Returns**

The updated **Task** if found


## REPORT (TODO)
The method listed below require authentication **please refer to Tasks for more information**
### GET - /report
Returns a PDF file with the task list for download