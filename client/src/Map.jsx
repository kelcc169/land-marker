import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MapMarker from './MapMarker';

const Map = (props) => {
		const Map = new ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
			container: 'map',
			minZoom: 12,
			maxZoom: 16
		});

	let contents;
	let lng = props.lng
	let lat = props.lat

	if (!lat && !lng) {
		contents = (
			<div>
				<Map
					center={[-122.3352, 47.6079]}
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: '75vh',
						width: '90vw'
					}}>
					<MapMarker handleUserLocation={props.handleUserLocation}/>
				</Map>
			</div>
		)
	}	else {
		contents = (
			<div>
				<Map
					center={[lng, lat]}
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: '75vh',
						width: '90vw'
					}}>
					<Marker coordinates={[lng, lat]}
						style={{backgroundColor: 'rgba(100, 0, 100, 50%)', height: '25px', width: '25px', borderRadius: '50%'}}>
					</Marker>
					<MapMarker />
				</Map>
			</div>
		)
	}

	return (
		<>
			{contents}
		</>
	)
}	

export default Map;