import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Abbey-of-senanque-provence-gordes.jpg',
		address: 'Some address 5, 12345 some city',
		description: 'This is the first meetup!'
	},
	{
		id: 'm2',
		title: 'A Second Meetup',
		image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Abbey-of-senanque-provence-gordes.jpg',
		address: 'Some address 10, 12345 some city',
		description: 'This is the second meetup!'
	},
]

function HomePage(props) {
	// props.meetups because you set meetups down there in getStaticProps()
	return <MeetupList meetups={props.meetups} />
}



// this is like a reserved function name, Nextjs looks for this and this function runs during the 'build' process of the Next-app.
// this function (snippet) never runs on the client side and the server side. It runs just during the 'build' process of this app.
// Nextjs calls this function first before calling the component function.
// this function is allowed to be asynchronous, meaning a 'js-promise' can be returned, Nextjs will wait for this promise to 'resolve' and the props for the component function is returned and then the component function is called with the returned props passed in that component function.
// in this function you can also execute any code that would normally only run on the server like accessing a file system, securly connecting to a database.
export async function getStaticProps(context) {
	// fetch data

	// here the DUMMY_MEETUPS will be loaded and prepared in this function and then will be set as 'props' for this page's component
	return (
	{
		// props: {}
		props: {
			meetups: DUMMY_MEETUPS
		},
		revalidate: 10 // 10 seconds or 3600 seconds (for 1 hour) | can put any number in seconds. This makes sure that after every 10/x seconds that you set, this page will be re-pre-generated on the server after deployment so that you don't have to redeploy and rebuild just because some data changed. This is good for static-site-generation (SSG) pages.
	});
}


// now to pregenerate the page dynamically, on the fly, after deployment on the server, not suring the 'build' process, not after couple of seconds but on every request
// this is also a reserved function name, Nextjs looks for this and this function does not run during the 'build' process but instead always on the server after deployment
// the code written here will always run on the server, not on the client
// use this only if the data changes frequently on the page because otherwise Static pages are better because server pages take time to load and rehydrate pages&components for every request and static pages are faster due to caching.
// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	// fetch data similar to getStaticProps() allows

// 	return ({
// 		props: {
// 			meetups: DUMMY_MEETUPS
// 		},
// 	});
// }



export default HomePage;