
struct Task {
  1: optional string id,
  2: string userId,
  3: optional string name = "",
  4: optional string createdOn,
  5: optional bool done
}


exception BaseException {
  1: i32 code,
  2: string message
}

service Tasks {

  //List Tasks
  list<Task> all(1:string userId),

  //Add Task
  Task add(1:string userId, 2:string name),

  //Update
  Task update(1:string taskId, 2:string name, 3:bool done, 4:string userId) throws (1:BaseException ouch)

  //Upsert
  Task upsert(1:Task task) throws (1:BaseException ouch)

}
