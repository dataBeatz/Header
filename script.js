import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 300,
  rps: 2000,
  duration: "120s"
};

export default function() {
  let id = Math.floor(Math.random() * 999999)
  let res = http.get("http://localhost:3004/artists/" + id);
  //sleep(1);
  check(res, {
    "status200": (r) => r.status == 200,
    'transaction time': (r) => r.timings.duration < 600
  })
};