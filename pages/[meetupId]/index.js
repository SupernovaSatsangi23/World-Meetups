import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
	return (
		<MeetupDetail
			image='https://upload.wikimedia.org/wikipedia/commons/e/e9/Abbey-of-senanque-provence-gordes.jpg'
			title='First Meetup'
			address='some street 5, some city'
			description='this is a first meetup'/>
	);
}

// this is required to define if you are coding in 'dynamic' pages such as this one and also at the same time using getStaticProps(). Not otherwise.
// this tells Nextjs for which dynamic parameter values, this page should be pre-generated.
// explanation: with getStaticProps() a page is pre-generated during the 'build' process. This means -
// - that Nextjs needs to pre-generate all versions of this dynamic page in advance (for all the supported (meetup)IDs). -
// - we get the ID from the url here, but keep in mind that this is not pre-generated when a user visits this page with a specific value in the url -
// - but during the build process. So here we need to pre-generate it for the urls (for the 'meetupId' values) that users might enter at runtime.
// And if they enter an ID for which we didn't pre-generate the page, they will see a 404 error.
export async function getStaticPaths() {
	// in real this 'paths' array is not hard coded but generated dynamically.
	// 'fallback' key tells Nextjs whether your 'paths' array contains all suported parameter values or just some of them.
	// if you set fallback:false; you say that your 'paths' contains all suported meetupId values (possibilities). Meaning for example if a user enters a path with meetupId:'m3', they will see a 404 error.
	// if you set fallback:true; then Nextjs will try to generate a page for this meetupId, dynamically on the server for the incoming request.
	return ({
		fallback: false,
		paths: [
			{params:{meetupId:'m1'}},
			{params:{meetupId:'m2'}},
		]
	});
}

export async function getStaticProps(context) {
	// fetch data

	// this is being used because useRouter hook can't be called here, outside of component function and we need the id in the url for the details' page
	// params.meetupId; because of the identifier between [...] in this filename. As this object {meetupId:url-value}
	const meetupId = context.params.meetupId;
	console.log(meetupId);

	return ({
		props: {
			meetupData: {
				image:'https://upload.wikimedia.org/wikipedia/commons/e/e9/Abbey-of-senanque-provence-gordes.jpg',
				id:meetupId,
				title:'First Meetup',
				address:'some street 5, some city',
				description:'this is a first meetup'
			}
		}
	});
}

export default MeetupDetails;