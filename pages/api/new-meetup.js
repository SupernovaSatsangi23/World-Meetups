// api/new-meetup
// if a request is sent to this url, it will trigger the function defined in this file

// req-object contains data about the incoming request and
// res-object will be needed for sending back a response
function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		const {title, image, address, description} = data;
	}
}

export default handler;