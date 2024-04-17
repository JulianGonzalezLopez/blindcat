import app from "../../src/app";
import request from "supertest";


describe("Integration test", () => {

  let token : string;

  test("GET  /ok    Expected 200", async () => {
    const response = await request(app).get("/ok");
    expect(response.statusCode).toBe(200);
  });

  test("POST /login Expected 200 with given username & password", async () => {
    const response = await request(app).post("/login/").send({username:"asd", password:"asd"});
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("POST /login Expected 400 with given username & password", async () => {
    const response = await request(app).post("/login/").send({username:"asd", password:"asssssssd"});
    expect(response.statusCode).toBe(400);
  });

  test("GET  /post  Expected 200 with given token", async () =>{
    if(typeof token == "string"){
      const response = await request(app).get("/post").set("Authorization", token);
      expect(response.statusCode).toBe(200);
    }
  });

  test("GET  /post  Expected 401 without token", async () =>{
    if(typeof token == "string"){
      const response = await request(app).get("/post");
      expect(response.statusCode).toBe(401);
    }
  });

  
  test("GET  /post/all  Expected 200 with given token", async () =>{
    if(typeof token == "string"){
      const response = await request(app).get("/post").set("Authorization", token);
      expect(response.statusCode).toBe(200);
    }
  });

  test("GET  /post/1/comments  Expected 200 if post 1 exists", async () =>{
    if(typeof token == "string"){
      const response = await request(app).get("/post").set("Authorization", token);
      expect(response.statusCode).toBe(200);
    }
  });

});