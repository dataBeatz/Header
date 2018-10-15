import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 300,
  rps: 500,
  iterations: 10000
};

export default function() {
  let id = Math.floor(Math.random() * 999999)
  let res = http.get("http://54.173.223.33/artists/" + id);
  //sleep(1);
  check(res, {
    "status200": (r) => r.status == 200,
    'transaction time': (r) => r.timings.duration < 600
  })
};