import LocalHost from "../localhost/LocalHost";

import axios from "axios";
export default axios.create({ baseURL: `http://${LocalHost.localhost}:8080/api` });
