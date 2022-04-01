import React, { useState, useEffect } from 'react';
import styles from '../styles/you-glish.module.css';

const YouGlish = () => {
	useEffect(() => {
		const tag = document.createElement('script');

		tag.src = 'https://youglish.com/public/emb/widget.js';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		let widget;

		function onYouGlishAPIReady(){
			widget = new YG.Widget('you-glish', {
				width: 300,
				components: 8,
				events: {
					'onFetchDone': onFetchDone,
					'onVideoChange': onVideoChange,
					'onCaptionConsumed': onCaptionConsumed
				}
			});
			// 4. process the query
			widget.fetch('courage', 'english');
		}

		let views = 0, curTrack = 0, totalTracks = 0;

		// 5. The API will call this method when the search is done
		function onFetchDone(event){
			if (event.totalResult === 0)   alert("No result found");
			else totalTracks = event.totalResult;
		}

		// 6. The API will call this method when switching to a new video.
		function onVideoChange(event){
			curTrack = event.trackNumber;
			views = 0;
		}

		// 7. The API will call this method when a caption is consumed.
		function onCaptionConsumed(event){
			if (++views < 3)
				widget.replay();
			else
			if (curTrack < totalTracks)
				widget.next();
		}
		setTimeout(onYouGlishAPIReady, 2000);
	}, []);
	return (
		<div className={styles.you_glish}>
			<div id={'you-glish'} />
		</div>
	);
};

export default YouGlish;
