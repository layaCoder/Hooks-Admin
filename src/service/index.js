import { get } from "./request";
import _longWangMiao1 from "../views/dataScreen/mockData/longWangMiao1.json";
import _longWangMiao2 from "../views/dataScreen/mockData/longWangMiao2.json";

const getLongWangMiao1 = () => {
	return get(
		"/api/sa/api/agent/lwm1sssj/1.0?AppKey=hms0zkq8n8bop7l1bxqik8ae&AppSecret=41v4kp7pfp7ezy3cjbjm7ibo7brsfe80&limit=5000"
	);
	// return _longWangMiao1;
};

const getLongWangMiao2 = () => {
	return get(
		"/api/sa/api/agent/lwm2sssj/1.0?AppKey=hms0zkq8n8bop7l1bxqik8ae&AppSecret=41v4kp7pfp7ezy3cjbjm7ibo7brsfe80&limit=5000"
	);
	// return _longWangMiao2;
};

export { getLongWangMiao1, getLongWangMiao2 };
