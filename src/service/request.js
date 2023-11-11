import axios from "axios";

const instance = axios.create({
	baseURL: "http://10.15.26.32:31000",
	timeout: 10000
});
const post = (url, data = {}) => {
	return new Promise((resolve, reject) => {
		instance
			.post(url, data, {
				header: {
					"Content-type": "application/json"
				}
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};
const get = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		instance.get(url, { params }).then(
			response => {
				resolve(response);
			},
			error => {
				reject(error);
			}
		);
	});
};
export { post, get };
