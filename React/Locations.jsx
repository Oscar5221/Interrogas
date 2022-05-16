import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import logger from 'sabio-debug';
import PageTitle from '../../candidates/PageTitle';
import LocationAutocomplete from './LocationAutoComplete';
import * as locationService from '../../../services/locationService.js';
import getLookUps from '../../../services/lookUpsService';
import toastr from 'toastr';
import Swal from 'sweetalert2';

const _logger = logger.extend('location');

const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: '560.590px',
    height: '376.134px',
};

const onLoad = (marker) => {
    _logger('marker: ', marker);
};

function Locations() {
    const [locationData, setLocationData] = useState({
        locationTypeId: 1,
        lineOne: '',
        lineTwo: '',
        city: '',
        zip: '',
        stateId: 0,
        latitude: '',
        longitude: '',
    });

    const [statesArray, setStatesArray] = useState([]);

    const [locationLatLng, setLocationLatLng] = useState({
        lat: 19.4326,
        lng: -99.1332,
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleApiKey,
        libraries: ['places'],
    });

    useEffect(() => {
        getLookUps(['States']).then(getStatesSuccess).catch(getStatesError);
    }, []);

    const getStatesSuccess = (response) => {
        _logger('GETSTATES: ', response.item.States);
        const statesAR = response.item.States;

        setStatesArray((prevState) => {
            let sArray = { ...prevState };
            sArray = statesAR;
            return sArray;
        });
    };

    const getStatesError = (errResponse) => {
        _logger('GETSTATESERROR: ', errResponse);
    };

    const getId = useCallback(
        (location) => {
            _logger(location);
            _logger(statesArray);
            for (let index = 0; index < statesArray.length; index++) {
                const currentMXState = statesArray[index];

                if (currentMXState.code === location) return currentMXState.id;
            }
        },
        [statesArray]
    );

    const onHandleSelected = useCallback(
        (locationObj, locationGeo) => {
            _logger('TEST: ', locationObj, locationGeo);

            const locationZip = locationObj[locationObj.length - 1].long_name;
            const locationStateCode = locationObj[locationObj.length - 3].short_name;
            const locationCity = locationObj[locationObj.length - 4].long_name;

            const removePeriods = () => {
                const newStateCode = locationStateCode.replaceAll('.', '');
                return newStateCode;
            };

            const finalStateCode = removePeriods();

            _logger(finalStateCode);

            setLocationData((prevState) => {
                const lData = { ...prevState };
                lData.lineOne = `${locationObj[0].long_name} ${locationObj[1].long_name}`;
                lData.lineTwo = locationObj[2].long_name;
                lData.city = locationCity;
                lData.zip = locationZip;
                lData.stateId = getId(finalStateCode);
                lData.latitude = locationGeo.location.lat();
                lData.longitude = locationGeo.location.lng();
                return lData;
            });

            setLocationLatLng((prevState) => {
                const latLng = { ...prevState };
                latLng.lat = locationGeo.location.lat();
                latLng.lng = locationGeo.location.lng();
                return latLng;
            });
        },
        [statesArray]
    );

    const onAddLocationClicked = (e) => {
        e.preventDefault();
        locationService.addLocation(locationData).then(addLocationSuccess).catch(addLocationError);
    };

    const addLocationSuccess = (response) => {
        _logger('Success!', response);
        Swal.fire('Excelente!', 'A New Location Was Added.', 'success');
    };

    const addLocationError = (errResponse) => {
        _logger('Error', errResponse);
        toastr.error('Please enter a valid street address', errResponse);
    };

    _logger('STATE', locationData);

    if (!isLoaded) return <div>Loading Map...</div>;
    return (
        <Row>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Maps', path: '/dashboard/locations/Locations' },
                    { label: 'Locations', path: '/dashboard/locations/Locations', active: true },
                ]}
                title={'Locations'}
            />

            <Col>
                <Card>
                    <Card.Body>
                        <h4 className="mb-3 header-title">Locations</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="autocomplete">Locations</Form.Label>
                                <LocationAutocomplete onHandleSelected={onHandleSelected} />
                            </Form.Group>

                            {/* WAS INSTRUCTED TO COMMENT THIS OUT VICE DELETE
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="locationType">Location Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="locationType"
                                    id="locationType"
                                    placeholder="Address Type"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="lineOne">Line One</Form.Label>
                                <Form.Control type="text" name="lineOne" id="lineOne" placeholder="Address Line One" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="lineTwo">Line Two</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lineTwo"
                                    id="lineTwo"
                                    placeholder="Address Line Two (Optional)"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="city">City</Form.Label>
                                <Form.Control type="text" name="city" id="city" placeholder="City" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="zip">Zip</Form.Label>
                                <Form.Control type="text" name="zip" id="zip" placeholder="Zip" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="stateId">State Id</Form.Label>
                                <Form.Control type="text" name="stateId" id="stateId" placeholder="State Id" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="latitude">Latitude</Form.Label>
                                <Form.Control type="text" name="latitude" id="latitude" placeholder="Latitude" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="longitude">Longitude</Form.Label>
                                <Form.Control type="text" name="longitude" id="longitude" placeholder="Longitude" />
                            </Form.Group> */}

                            <Button variant="primary" type="submit" onClick={onAddLocationClicked}>
                                Add Location
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <GoogleMap mapContainerStyle={containerStyle} center={locationLatLng} zoom={10}>
                            <Marker onLoad={onLoad} position={locationLatLng} />
                        </GoogleMap>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Locations;
