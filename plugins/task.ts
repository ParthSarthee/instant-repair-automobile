type TaskError = Error & { nf?: boolean };
type TaskResponse = [TaskError, any];

var asyncTask = function (promise): Promise<TaskResponse> {
	return promise
		.then(function (data) {
			if (data) return [null, data];
			else {
				let err: TaskError = new Error("#404 Object Not Found!");
				err.nf = true;
				return [err];
			}
		})
		.catch((err: TaskError) => [err]);
};

export { asyncTask as task };
