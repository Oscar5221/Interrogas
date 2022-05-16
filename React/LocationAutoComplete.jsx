import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import logger from 'sabio-debug';
import PropTypes from 'prop-types';
import './autocomplete.css';

const _logger = logger.extend('location');

function LocationAutocomplete(props) {
    const [autocomplete, setAutocomplete] = useState();

    const onLoad = (autocomplete) => {
        _logger('autocomplete: ', autocomplete);
        setAutocomplete(() => autocomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            _logger('Place Object', autocomplete.getPlace());
            let locationObj = autocomplete.getPlace();
            props.onHandleSelected(locationObj.address_components, locationObj.geometry);
        } else {
            _logger('Autocomplete is not loaded yet!');
        }
    };

    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input type="text" placeholder="Enter an address" className="autocomplete" />
        </Autocomplete>
    );
}

LocationAutocomplete.propTypes = {
    onHandleSelected: PropTypes.func.isRequired,
};

export default LocationAutocomplete;
