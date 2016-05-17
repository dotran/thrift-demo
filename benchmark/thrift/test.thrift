struct Test {
  1: optional i32 id,
  2: string name,
  3: optional string date = ""
}

service TestService {
  //Test
  list<Test> test(),

  //Send
  void send(1:list<Test> tests),

  //Send Receive
  list<Test> sendReceive(1:list<Test> tests)
}
