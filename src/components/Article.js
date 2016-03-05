import React from 'react';

import { Link } from 'react-router';

export default function(props) {
	return (
		<article>
			<Link to={`/${props.article.id}`}>{ props.article.title }</Link>
		</article>
	);
}